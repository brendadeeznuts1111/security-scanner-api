/**
 * Benchmark: Bun native API replacements
 *
 * Tests the 3 patterns replaced in scan.ts against their userland equivalents.
 * Uses Bun.nanoseconds() for timing per https://bun.sh/docs/api/utils#bun-nanoseconds
 *
 * Run: bun run benchmarks/bench-native.ts
 *
 * References:
 *   - Bun.stripANSI: https://bun.sh/docs/api/utils#bun-stripansi
 *   - proc.stdout.text(): https://bun.sh/docs/api/spawn#reading-stdout
 *   - Bun.fileURLToPath: https://bun.sh/docs/api/utils#bun-fileurltopath
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

// ── Summary ─────────────────────────────────────────────────────────

console.log("\n═══ SUMMARY ═══");
console.log(`Iterations: ${ITERATIONS} (sync), 5000 (stream), 100 (subprocess)`);
console.log(`Warmup: ${WARMUP}`);
console.log(`Bun version: ${Bun.version}`);
console.log(`Platform: ${process.platform} ${process.arch}`);
console.log(`Timestamp: ${new Date().toISOString()}`);
