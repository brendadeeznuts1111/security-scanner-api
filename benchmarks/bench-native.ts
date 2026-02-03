/**
 * Benchmark: Bun native API replacements
 *
 * Tests the 3 patterns replaced in scan.ts against their userland equivalents,
 * plus Bun.wrapAnsi performance across input sizes and option variants.
 *
 * Run: bun run benchmarks/bench-native.ts
 *
 * References:
 *   - Bun.stripANSI: https://bun.sh/docs/api/utils#bun-stripansi
 *   - proc.stdout.text(): https://bun.sh/docs/api/spawn#reading-stdout
 *   - Bun.fileURLToPath: https://bun.sh/docs/api/utils#bun-fileurltopath
 *   - Bun.wrapAnsi: https://bun.sh/docs/api/utils#bun-wrapansi
 *   - Bun.deepEquals: https://bun.sh/docs/api/utils#bun-deepequals
 */

import {
  ITERATIONS, bench, benchAsync, fmt,
  useColor, S, o, R, B, D, vw,
  sectionHeader, report,
  loadMemberProfile, renderSummary,
} from "./bench-core.ts";

// ── Total runtime tracking ───────────────────────────────────────────
const t0 = Bun.nanoseconds();

// ── Bench 1: stripAnsi ──────────────────────────────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-stripansi
// Bun docs: ~6-57x faster strip-ansi alternative (vs npm package).
// We compare against a simple inline regex (not the npm package).

sectionHeader("1. stripAnsi: regex vs Bun.stripANSI", "https://bun.sh/docs/api/utils#bun-stripansi");

const ANSI_INPUTS = {
  short: "\x1b[1m\x1b[32mok\x1b[0m",
  medium: "\x1b[1m\x1b[32mfoo\x1b[0m bar \x1b[31merror\x1b[0m baz \x1b[36m[12:34:56]\x1b[0m",
  heavy: Array.from({ length: 20 }, (_, i) => `\x1b[${31 + (i % 7)}mword${i}\x1b[0m`).join(" "),
  plain: "no ansi codes here at all, just plain text for comparison",
};

const stripAnsiRegex = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

for (const [name, input] of Object.entries(ANSI_INPUTS)) {
  console.log(`  ${D}[${name}] (${input.length} raw, ${vw(input)} visible)${R}`);

  // Verify correctness first
  const regexOut = stripAnsiRegex(input);
  const nativeOut = Bun.stripANSI(input);
  if (regexOut !== nativeOut) {
    console.log(`  ${o(S.red)}⚠ OUTPUT MISMATCH: regex=${JSON.stringify(regexOut)} native=${JSON.stringify(nativeOut)}${R}`);
  }

  const old = bench("regex", () => stripAnsiRegex(input));
  const neo = bench("Bun.stripANSI", () => Bun.stripANSI(input));
  report(name, old, neo);
  console.log();
}

// ── Bench 2: ReadableStream.text() vs new Response(stream).text() ──
// Ref: https://bun.sh/docs/api/spawn#reading-stdout
// proc.stdout is a ReadableStream when stdout: "pipe".
// Bun.spawn ReadableStream includes .text(), .json(), .bytes() methods.
// Old pattern: new Response(proc.stderr).text()
// New pattern: proc.stderr.text()

sectionHeader("2. ReadableStream: new Response(stream).text() vs stream.text()", "https://bun.sh/docs/api/spawn#reading-stdout");

const STREAM_CONTENT = "Error: could not be found in keychain\nSecKeychainSearchCopyNext: The specified item could not be found.\n";
const streamBytes = new TextEncoder().encode(STREAM_CONTENT);

// Create a fresh ReadableStream each iteration (streams are consumed once)
function makeStream(): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(streamBytes);
      controller.close();
    },
  });
}

const r2old = await benchAsync("Response wrapper", async () => {
  const stream = makeStream();
  await new Response(stream).text();
}, 5_000);

const r2new = await benchAsync("stream.text()", async () => {
  const stream = makeStream();
  await stream.text();
}, 5_000);

report("ReadableStream", r2old, r2new);

// Correctness: verify stream.text() returns the original content
{
  const verifyStream = makeStream();
  const verifyText = await verifyStream.text();
  const streamMatch = Bun.deepEquals(verifyText, STREAM_CONTENT);
  console.log(`  Stream correctness: ${streamMatch ? `${o(S.green)}pass${R}` : `${o(S.red)}FAIL${R}`} (Bun.deepEquals)`);
}

// Real subprocess benchmark (fewer iterations — spawning is expensive)
console.log(`\n  ${D}[subprocess] real Bun.spawn + read stderr (100 iterations)${R}`);

const r2subOld = await benchAsync("Response(proc.stderr)", async () => {
  const proc = Bun.spawn(["echo", "test"], { stdout: "pipe", stderr: "pipe" });
  await new Response(proc.stdout).text();
  await proc.exited;
}, 100);

const r2subNew = await benchAsync("proc.stdout.text()", async () => {
  const proc = Bun.spawn(["echo", "test"], { stdout: "pipe", stderr: "pipe" });
  await proc.stdout.text();
  await proc.exited;
}, 100);

report("subprocess", r2subOld, r2subNew);

// ── Bench 3: URL.pathname vs Bun.fileURLToPath ──────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-fileurltopath
// Bun.fileURLToPath converts file:// URLs to absolute filesystem paths.
// Observed: correctly decodes percent-encoded characters (confirmed by test).

sectionHeader("3. URL.pathname vs Bun.fileURLToPath", "https://bun.sh/docs/api/utils#bun-fileurltopath");

const URL_CASES = {
  simple: { base: "file:///Users/test/project/", relative: "./scan-worker.ts" },
  spaces: { url: "file:///Users/test/my%20project/scan-worker.ts" },
  unicode: { url: "file:///Users/tëst/日本語/scan.ts" },
  deep: { base: "file:///a/b/c/d/e/f/g/", relative: "./worker.ts" },
};

// simple: relative URL resolution
{
  const { base, relative } = URL_CASES.simple;
  console.log(`  ${D}[simple] new URL("${relative}", "${base}")${R}`);

  const pathA = new URL(relative, base).pathname;
  const pathB = Bun.fileURLToPath(new URL(relative, base));
  console.log(`  URL.pathname:      ${pathA}`);
  console.log(`  fileURLToPath:     ${pathB}`);
  const match = pathA === pathB;
  console.log(`  match: ${match ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`}\n`);

  const old = bench("URL.pathname", () => new URL(relative, base).pathname);
  const neo = bench("fileURLToPath", () => Bun.fileURLToPath(new URL(relative, base)));
  report("simple", old, neo);
}

// spaces: percent-encoding correctness
{
  const { url } = URL_CASES.spaces;
  console.log(`\n  ${D}[spaces] "${url}"${R}`);

  const pathA = new URL(url).pathname;
  const pathB = Bun.fileURLToPath(url);
  const decodedA = pathA.includes(" ");
  const decodedB = pathB.includes(" ");
  console.log(`  URL.pathname:      ${pathA}  (decoded: ${decodedA ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`})`);
  console.log(`  fileURLToPath:     ${pathB}  (decoded: ${decodedB ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`})`);

  const old = bench("URL.pathname", () => new URL(url).pathname);
  const neo = bench("fileURLToPath", () => Bun.fileURLToPath(url));
  report("spaces", old, neo);
}

// unicode
{
  const { url } = URL_CASES.unicode;
  console.log(`\n  ${D}[unicode] "${url}"${R}`);

  const pathA = new URL(url).pathname;
  const pathB = Bun.fileURLToPath(url);
  console.log(`  URL.pathname:      ${pathA}`);
  console.log(`  fileURLToPath:     ${pathB}`);

  const old = bench("URL.pathname", () => new URL(url).pathname);
  const neo = bench("fileURLToPath", () => Bun.fileURLToPath(url));
  report("unicode", old, neo);
}

// deep: deeply nested path resolution
{
  const { base, relative } = URL_CASES.deep;
  console.log(`\n  ${D}[deep] new URL("${relative}", "${base}")${R}`);

  const pathA = new URL(relative, base).pathname;
  const pathB = Bun.fileURLToPath(new URL(relative, base));
  console.log(`  URL.pathname:      ${pathA}`);
  console.log(`  fileURLToPath:     ${pathB}`);
  const match = pathA === pathB;
  console.log(`  match: ${match ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`}\n`);

  const old = bench("URL.pathname", () => new URL(relative, base).pathname);
  const neo = bench("fileURLToPath", () => Bun.fileURLToPath(new URL(relative, base)));
  report("deep", old, neo);
}

// ── Bench 4: Bun.wrapAnsi ────────────────────────────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-wrapansi
// Bun docs: 33-88x faster than wrap-ansi npm package.
// Native ANSI-aware word wrapping with color preservation across line breaks.

sectionHeader("4. Bun.wrapAnsi", "https://bun.sh/docs/api/utils#bun-wrapansi");

const WRAP_COLS = 20;

const WRAP_INPUTS = {
  short: "\x1b[31mThis is a short colored text\x1b[0m padding!!",
  medium: Array.from({ length: 18 }, (_, i) => `\x1b[${31 + (i % 7)}mWord${i} text segment here\x1b[0m`).join(" "),
  long: "",
  hardWrap: "",
  noTrimLong: "",
};
WRAP_INPUTS.long = WRAP_INPUTS.medium.repeat(10);
WRAP_INPUTS.hardWrap = Array.from({ length: 200 }, (_, i) => `\x1b[${31 + (i % 7)}mLongword${i}coloredtext\x1b[0m`).join(" ");
WRAP_INPUTS.noTrimLong = "  " + WRAP_INPUTS.long + "  ";

// Correctness: verify color preservation across line breaks
{
  const text = "\x1b[31mThis is a long red text that needs wrapping\x1b[0m";
  const wrapped = Bun.wrapAnsi(text, WRAP_COLS);
  const wrapLines = wrapped.split("\n");
  const allColored = wrapLines.every((l) => l.includes("\x1b[31m"));
  const passColor = allColored ? o(S.green) : o(S.red);
  console.log(`  Color preservation: ${passColor}${allColored ? "pass" : "FAIL"}${R} (${wrapLines.length} lines, all re-open red)`);
}

// Size benchmarks (matching Bun v1.3.7 release notes cases)
const wrapCases: [string, string, Parameters<typeof Bun.wrapAnsi>[2]][] = [
  ["short (~45 chars)", WRAP_INPUTS.short, undefined],
  ["medium (~810 chars)", WRAP_INPUTS.medium, undefined],
  ["long (~8100 chars)", WRAP_INPUTS.long, undefined],
  ["hard wrap colored", WRAP_INPUTS.hardWrap, { hard: true }],
  ["no trim long", WRAP_INPUTS.noTrimLong, { trim: false }],
];

const wrapRows: { Case: string; Chars: number; Mean: string; Min: string; Max: string }[] = [];
for (const [name, input, opts] of wrapCases) {
  const r = bench(name, () => Bun.wrapAnsi(input, WRAP_COLS, opts));
  wrapRows.push({ Case: name, Chars: input.length, Mean: fmt(r.mean_ns), Min: fmt(r.min_ns), Max: fmt(r.max_ns) });
}
// @ts-expect-error Bun.inspect.table accepts options as third arg
console.log(Bun.inspect.table(wrapRows, ["Case", "Chars", "Mean", "Min", "Max"], { colors: useColor }));

// Option variants (all on long input)
console.log(`  ${D}[option variants] (long input, 20 cols)${R}`);

const optCases: [string, Parameters<typeof Bun.wrapAnsi>[2]][] = [
  ["default", undefined],
  ["hard: true", { hard: true }],
  ["wordWrap: false", { wordWrap: false }],
  ["trim: false", { trim: false }],
  ["ambiguousIsNarrow: false", { ambiguousIsNarrow: false }],
];

const optRows: { Option: string; Mean: string; Min: string }[] = [];
for (const [name, opts] of optCases) {
  const r = bench(name, () => Bun.wrapAnsi(WRAP_INPUTS.long, WRAP_COLS, opts));
  optRows.push({ Option: name, Mean: fmt(r.mean_ns), Min: fmt(r.min_ns) });
}
// @ts-expect-error Bun.inspect.table accepts options as third arg
console.log(Bun.inspect.table(optRows, ["Option", "Mean", "Min"], { colors: useColor }));

// ── Summary ─────────────────────────────────────────────────────────

const { key: memberKey, profile: memberProfile } = await loadMemberProfile();
renderSummary({ t0, iterLabel: `${ITERATIONS} (sync), 5000 (stream), 100 (subprocess)`, memberKey, memberProfile });
