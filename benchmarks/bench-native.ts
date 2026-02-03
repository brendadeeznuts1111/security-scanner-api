/**
 * Benchmark: Bun native API replacements
 *
 * Tests the 3 patterns replaced in scan.ts against their userland equivalents,
 * plus Bun.wrapAnsi performance across input sizes and option variants.
 * Uses Bun.nanoseconds() for timing per https://bun.sh/docs/api/utils#bun-nanoseconds
 *
 * Run: bun run benchmarks/bench-native.ts
 *
 * References:
 *   - Bun.stripANSI: https://bun.sh/docs/api/utils#bun-stripansi
 *   - proc.stdout.text(): https://bun.sh/docs/api/spawn#reading-stdout
 *   - Bun.fileURLToPath: https://bun.sh/docs/api/utils#bun-fileurltopath
 *   - Bun.wrapAnsi: https://bun.sh/docs/api/utils#bun-wrapansi
 */

const ITERATIONS = 10_000;
const WARMUP = 500;

// ── Harness ─────────────────────────────────────────────────────────

function bench(label: string, fn: () => void): { mean_ns: number; min_ns: number; max_ns: number } {
  for (let i = 0; i < WARMUP; i++) fn();

  let min = Number.POSITIVE_INFINITY;
  let max = 0;
  let total = 0;

  for (let i = 0; i < ITERATIONS; i++) {
    const start = Bun.nanoseconds();
    fn();
    const elapsed = Bun.nanoseconds() - start;
    total += elapsed;
    if (elapsed < min) min = elapsed;
    if (elapsed > max) max = elapsed;
  }

  return { mean_ns: total / ITERATIONS, min_ns: min, max_ns: max };
}

async function benchAsync(
  label: string,
  fn: () => Promise<void>,
  iters = ITERATIONS,
): Promise<{ mean_ns: number; min_ns: number; max_ns: number }> {
  for (let i = 0; i < Math.min(WARMUP, iters); i++) await fn();

  let min = Number.POSITIVE_INFINITY;
  let max = 0;
  let total = 0;

  for (let i = 0; i < iters; i++) {
    const start = Bun.nanoseconds();
    await fn();
    const elapsed = Bun.nanoseconds() - start;
    total += elapsed;
    if (elapsed < min) min = elapsed;
    if (elapsed > max) max = elapsed;
  }

  return { mean_ns: total / iters, min_ns: min, max_ns: max };
}

const fmt = (ns: number) =>
  ns < 1_000 ? `${ns.toFixed(1)} ns` : ns < 1_000_000 ? `${(ns / 1_000).toFixed(2)} µs` : `${(ns / 1_000_000).toFixed(2)} ms`;

function report(label: string, old: ReturnType<typeof bench>, neo: ReturnType<typeof bench>) {
  const ratio = old.mean_ns / neo.mean_ns;
  const diff = old.mean_ns - neo.mean_ns;
  console.log(`  old (${label}):  mean=${fmt(old.mean_ns)}  min=${fmt(old.min_ns)}  max=${fmt(old.max_ns)}`);
  console.log(`  new (${label}):  mean=${fmt(neo.mean_ns)}  min=${fmt(neo.min_ns)}  max=${fmt(neo.max_ns)}`);
  console.log(`  Δ: ${diff > 0 ? "+" : ""}${fmt(diff)}/op  ratio: ${ratio.toFixed(2)}x  ${ratio > 1 ? "(new is faster)" : ratio < 1 ? "(old is faster)" : "(equal)"}`);
}

// ── Bench 1: stripAnsi ──────────────────────────────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-stripansi
// Bun docs: ~6-57x faster strip-ansi alternative (vs npm package).
// We compare against a simple inline regex (not the npm package).

console.log("═══ 1. stripAnsi: regex vs Bun.stripANSI ═══");
console.log(`   ref: https://bun.sh/docs/api/utils#bun-stripansi\n`);

const ANSI_INPUTS = {
  short: "\x1b[1m\x1b[32mok\x1b[0m",
  medium: "\x1b[1m\x1b[32mfoo\x1b[0m bar \x1b[31merror\x1b[0m baz \x1b[36m[12:34:56]\x1b[0m",
  heavy: Array.from({ length: 20 }, (_, i) => `\x1b[${31 + (i % 7)}mword${i}\x1b[0m`).join(" "),
  plain: "no ansi codes here at all, just plain text for comparison",
};

const stripAnsiRegex = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

for (const [name, input] of Object.entries(ANSI_INPUTS)) {
  console.log(`  [${name}] (${input.length} chars)`);

  // Verify correctness first
  const regexOut = stripAnsiRegex(input);
  const nativeOut = Bun.stripANSI(input);
  if (regexOut !== nativeOut) {
    console.log(`  ⚠ OUTPUT MISMATCH: regex=${JSON.stringify(regexOut)} native=${JSON.stringify(nativeOut)}`);
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

console.log("═══ 2. ReadableStream: new Response(stream).text() vs stream.text() ═══");
console.log(`   ref: https://bun.sh/docs/api/spawn#reading-stdout\n`);

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

// Real subprocess benchmark (fewer iterations — spawning is expensive)
console.log("\n  [subprocess] real Bun.spawn + read stderr (100 iterations)");

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

console.log("\n═══ 3. URL.pathname vs Bun.fileURLToPath ═══");
console.log(`   ref: https://bun.sh/docs/api/utils#bun-fileurltopath\n`);

const URL_CASES = {
  simple: { base: "file:///Users/test/project/", relative: "./scan-worker.ts" },
  spaces: { url: "file:///Users/test/my%20project/scan-worker.ts" },
  unicode: { url: "file:///Users/tëst/日本語/scan.ts" },
  deep: { base: "file:///a/b/c/d/e/f/g/", relative: "./worker.ts" },
};

// simple: relative URL resolution
{
  const { base, relative } = URL_CASES.simple;
  console.log(`  [simple] new URL("${relative}", "${base}")`);

  const pathA = new URL(relative, base).pathname;
  const pathB = Bun.fileURLToPath(new URL(relative, base));
  console.log(`  URL.pathname:      ${pathA}`);
  console.log(`  fileURLToPath:     ${pathB}`);
  console.log(`  match: ${pathA === pathB}\n`);

  const old = bench("URL.pathname", () => new URL(relative, base).pathname);
  const neo = bench("fileURLToPath", () => Bun.fileURLToPath(new URL(relative, base)));
  report("simple", old, neo);
}

// spaces: percent-encoding correctness
{
  const { url } = URL_CASES.spaces;
  console.log(`\n  [spaces] "${url}"`);

  const pathA = new URL(url).pathname;
  const pathB = Bun.fileURLToPath(url);
  console.log(`  URL.pathname:      ${pathA}  (decoded: ${pathA.includes(" ")})`);
  console.log(`  fileURLToPath:     ${pathB}  (decoded: ${pathB.includes(" ")})`);

  const old = bench("URL.pathname", () => new URL(url).pathname);
  const neo = bench("fileURLToPath", () => Bun.fileURLToPath(url));
  report("spaces", old, neo);
}

// unicode
{
  const { url } = URL_CASES.unicode;
  console.log(`\n  [unicode] "${url}"`);

  const pathA = new URL(url).pathname;
  const pathB = Bun.fileURLToPath(url);
  console.log(`  URL.pathname:      ${pathA}`);
  console.log(`  fileURLToPath:     ${pathB}`);

  const old = bench("URL.pathname", () => new URL(url).pathname);
  const neo = bench("fileURLToPath", () => Bun.fileURLToPath(url));
  report("unicode", old, neo);
}

// ── Bench 4: Bun.wrapAnsi ────────────────────────────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-wrapansi
// Bun docs: 33-88x faster than wrap-ansi npm package.
// Native ANSI-aware word wrapping with color preservation across line breaks.

console.log("\n═══ 4. Bun.wrapAnsi ═══");
console.log(`   ref: https://bun.sh/docs/api/utils#bun-wrapansi\n`);

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
  console.log(`  Color preservation: ${allColored ? "pass" : "FAIL"} (${wrapLines.length} lines, all re-open red)`);
}

// Size benchmarks (matching Bun v1.3.7 release notes cases)
const wrapCases: [string, string, Parameters<typeof Bun.wrapAnsi>[2]][] = [
  ["short (~45 chars)", WRAP_INPUTS.short, undefined],
  ["medium (~810 chars)", WRAP_INPUTS.medium, undefined],
  ["long (~8100 chars)", WRAP_INPUTS.long, undefined],
  ["hard wrap colored", WRAP_INPUTS.hardWrap, { hard: true }],
  ["no trim long", WRAP_INPUTS.noTrimLong, { trim: false }],
];

for (const [name, input, opts] of wrapCases) {
  console.log(`  [${name}] (${input.length} chars)`);
  const r = bench(name, () => Bun.wrapAnsi(input, WRAP_COLS, opts));
  console.log(`  Bun.wrapAnsi:  mean=${fmt(r.mean_ns)}  min=${fmt(r.min_ns)}  max=${fmt(r.max_ns)}`);
  console.log();
}

// Option variants (all on long input)
console.log("  [option variants] (long input, 20 cols)");

const optCases: [string, Parameters<typeof Bun.wrapAnsi>[2]][] = [
  ["default", undefined],
  ["hard: true", { hard: true }],
  ["wordWrap: false", { wordWrap: false }],
  ["trim: false", { trim: false }],
  ["ambiguousIsNarrow: false", { ambiguousIsNarrow: false }],
];

for (const [name, opts] of optCases) {
  const r = bench(name, () => Bun.wrapAnsi(WRAP_INPUTS.long, WRAP_COLS, opts));
  console.log(`  ${name.padEnd(28)} mean=${fmt(r.mean_ns)}  min=${fmt(r.min_ns)}`);
}
console.log();

// ── Load team member profile ─────────────────────────────────────────

interface MemberProfile {
  name: string;
  timezone: string;
  notes: string;
  machine: { os: string; arch: string; cpu: string; cores: number; memory_gb: number; bun_version: string };
}
interface BenchRC { team: Record<string, MemberProfile> }

let memberKey: string | null = null;
let memberProfile: MemberProfile | null = null;

{
  const benchrcPath = `${import.meta.dir}/../.benchrc.json`;
  const benchrcFile = Bun.file(benchrcPath);
  if (await benchrcFile.exists()) {
    try {
      const rc = (await benchrcFile.json()) as BenchRC;
      const user = Bun.env.USER ?? "";
      if (rc.team?.[user]) {
        memberKey = user;
        memberProfile = rc.team[user];
      }
    } catch {}
  }
}

// ── Summary ─────────────────────────────────────────────────────────

console.log("\n═══ SUMMARY ═══");
console.log(`Iterations: ${ITERATIONS} (sync), 5000 (stream), 100 (subprocess)`);
console.log(`Warmup: ${WARMUP}`);
console.log(`Bun version: ${Bun.version}`);
console.log(`Platform: ${process.platform} ${process.arch}`);
console.log(`Timestamp: ${new Date().toISOString()}`);
console.log(`Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);

if (memberProfile) {
  console.log(`Member: ${memberKey} (${memberProfile.name})`);
  console.log(`Machine: ${memberProfile.machine.cpu}, ${memberProfile.machine.cores} cores, ${memberProfile.machine.memory_gb} GB`);
  console.log(`Timezone: ${memberProfile.timezone}`);
  console.log(`Notes: ${memberProfile.notes || "(none)"}`);
} else {
  console.log(`Member: (unknown — run: bun run benchmarks/team-init.ts)`);
}
