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
	ITERATIONS,
	bench,
	benchAsync,
	fmt,
	useColor,
	S,
	o,
	R,
	B,
	D,
	vw,
	sectionHeader,
	report,
	checkPass,
	loadMemberProfile,
	renderSummary,
} from './bench-core.ts';

// ── Total runtime tracking ───────────────────────────────────────────
const t0 = Bun.nanoseconds();

// ── Bench 1: stripAnsi ──────────────────────────────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-stripansi
// Bun docs: ~6-57x faster strip-ansi alternative (vs npm package).
// We compare against a simple inline regex (not the npm package).

sectionHeader('1. stripAnsi: regex vs Bun.stripANSI', 'https://bun.sh/docs/api/utils#bun-stripansi');

const ANSI_INPUTS = {
	short: '\x1b[1m\x1b[32mok\x1b[0m',
	medium: '\x1b[1m\x1b[32mfoo\x1b[0m bar \x1b[31merror\x1b[0m baz \x1b[36m[12:34:56]\x1b[0m',
	heavy: Array.from({length: 20}, (_, i) => `\x1b[${31 + (i % 7)}mword${i}\x1b[0m`).join(' '),
	plain: 'no ansi codes here at all, just plain text for comparison',
};

const stripAnsiRegex = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '');

for (const [name, input] of Object.entries(ANSI_INPUTS)) {
	console.log(`  ${D}[${name}] (${input.length} raw, ${vw(input)} visible)${R}`);

	// Verify correctness first
	const regexOut = stripAnsiRegex(input);
	const nativeOut = Bun.stripANSI(input);
	if (regexOut !== nativeOut) {
		console.log(
			`  ${o(S.red)}⚠ OUTPUT MISMATCH: regex=${JSON.stringify(regexOut)} native=${JSON.stringify(nativeOut)}${R}`,
		);
	}

	const old = bench('regex', () => stripAnsiRegex(input));
	const neo = bench('Bun.stripANSI', () => Bun.stripANSI(input));
	report(name, old, neo);
	console.log();
}

// ── Bench 2: ReadableStream.text() vs new Response(stream).text() ──
// Ref: https://bun.sh/docs/api/spawn#reading-stdout
// proc.stdout is a ReadableStream when stdout: "pipe".
// Bun.spawn ReadableStream includes .text(), .json(), .bytes() methods.
// Old pattern: new Response(proc.stderr).text()
// New pattern: proc.stderr.text()

sectionHeader(
	'2. ReadableStream: new Response(stream).text() vs stream.text()',
	'https://bun.sh/docs/api/spawn#reading-stdout',
);

const STREAM_CONTENT =
	'Error: could not be found in keychain\nSecKeychainSearchCopyNext: The specified item could not be found.\n';
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

const r2old = await benchAsync(
	'Response wrapper',
	async () => {
		const stream = makeStream();
		await new Response(stream).text();
	},
	5_000,
);

const r2new = await benchAsync(
	'stream.text()',
	async () => {
		const stream = makeStream();
		await stream.text();
	},
	5_000,
);

report('ReadableStream', r2old, r2new);

// Correctness: verify stream.text() returns the original content
{
	const verifyStream = makeStream();
	const verifyText = await verifyStream.text();
	const streamMatch = Bun.deepEquals(verifyText, STREAM_CONTENT);
	console.log(
		`  Stream correctness: ${streamMatch ? `${o(S.green)}pass${R}` : `${o(S.red)}FAIL${R}`} (Bun.deepEquals)`,
	);
}

// Real subprocess benchmark (fewer iterations — spawning is expensive)
console.log(`\n  ${D}[subprocess] real Bun.spawn + read stderr (100 iterations)${R}`);

const r2subOld = await benchAsync(
	'Response(proc.stderr)',
	async () => {
		const proc = Bun.spawn(['echo', 'test'], {stdout: 'pipe', stderr: 'pipe'});
		await new Response(proc.stdout).text();
		await proc.exited;
	},
	100,
);

const r2subNew = await benchAsync(
	'proc.stdout.text()',
	async () => {
		const proc = Bun.spawn(['echo', 'test'], {stdout: 'pipe', stderr: 'pipe'});
		await proc.stdout.text();
		await proc.exited;
	},
	100,
);

report('subprocess', r2subOld, r2subNew);

// ── Bench 3: URL.pathname vs Bun.fileURLToPath ──────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-fileurltopath
// Bun.fileURLToPath converts file:// URLs to absolute filesystem paths.
// Observed: correctly decodes percent-encoded characters (confirmed by test).

sectionHeader('3. URL.pathname vs Bun.fileURLToPath', 'https://bun.sh/docs/api/utils#bun-fileurltopath');

const URL_CASES = {
	simple: {base: 'file:///Users/test/project/', relative: './scan-worker.ts'},
	spaces: {url: 'file:///Users/test/my%20project/scan-worker.ts'},
	unicode: {url: 'file:///Users/tëst/日本語/scan.ts'},
	deep: {base: 'file:///a/b/c/d/e/f/g/', relative: './worker.ts'},
};

// simple: relative URL resolution
{
	const {base, relative} = URL_CASES.simple;
	console.log(`  ${D}[simple] new URL("${relative}", "${base}")${R}`);

	const pathA = new URL(relative, base).pathname;
	const pathB = Bun.fileURLToPath(new URL(relative, base));
	console.log(`  URL.pathname:      ${pathA}`);
	console.log(`  fileURLToPath:     ${pathB}`);
	const match = pathA === pathB;
	console.log(`  match: ${match ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`}\n`);

	const old = bench('URL.pathname', () => new URL(relative, base).pathname);
	const neo = bench('fileURLToPath', () => Bun.fileURLToPath(new URL(relative, base)));
	report('simple', old, neo);
}

// spaces: percent-encoding correctness
{
	const {url} = URL_CASES.spaces;
	console.log(`\n  ${D}[spaces] "${url}"${R}`);

	const pathA = new URL(url).pathname;
	const pathB = Bun.fileURLToPath(url);
	const decodedA = pathA.includes(' ');
	const decodedB = pathB.includes(' ');
	console.log(
		`  URL.pathname:      ${pathA}  (decoded: ${decodedA ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`})`,
	);
	console.log(
		`  fileURLToPath:     ${pathB}  (decoded: ${decodedB ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`})`,
	);

	const old = bench('URL.pathname', () => new URL(url).pathname);
	const neo = bench('fileURLToPath', () => Bun.fileURLToPath(url));
	report('spaces', old, neo);
}

// unicode
{
	const {url} = URL_CASES.unicode;
	console.log(`\n  ${D}[unicode] "${url}"${R}`);

	const pathA = new URL(url).pathname;
	const pathB = Bun.fileURLToPath(url);
	console.log(`  URL.pathname:      ${pathA}`);
	console.log(`  fileURLToPath:     ${pathB}`);

	const old = bench('URL.pathname', () => new URL(url).pathname);
	const neo = bench('fileURLToPath', () => Bun.fileURLToPath(url));
	report('unicode', old, neo);
}

// deep: deeply nested path resolution
{
	const {base, relative} = URL_CASES.deep;
	console.log(`\n  ${D}[deep] new URL("${relative}", "${base}")${R}`);

	const pathA = new URL(relative, base).pathname;
	const pathB = Bun.fileURLToPath(new URL(relative, base));
	console.log(`  URL.pathname:      ${pathA}`);
	console.log(`  fileURLToPath:     ${pathB}`);
	const match = pathA === pathB;
	console.log(`  match: ${match ? `${o(S.green)}true${R}` : `${o(S.red)}false${R}`}\n`);

	const old = bench('URL.pathname', () => new URL(relative, base).pathname);
	const neo = bench('fileURLToPath', () => Bun.fileURLToPath(new URL(relative, base)));
	report('deep', old, neo);
}

// ── Bench 4: Bun.wrapAnsi ────────────────────────────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-wrapansi
// Bun docs: 33-88x faster than wrap-ansi npm package.
// Native ANSI-aware word wrapping with color preservation across line breaks.

sectionHeader('4. Bun.wrapAnsi', 'https://bun.sh/docs/api/utils#bun-wrapansi');

const WRAP_COLS = 20;

const WRAP_INPUTS = {
	short: '\x1b[31mThis is a short colored text\x1b[0m padding!!',
	medium: Array.from({length: 18}, (_, i) => `\x1b[${31 + (i % 7)}mWord${i} text segment here\x1b[0m`).join(' '),
	long: '',
	hardWrap: '',
	noTrimLong: '',
};
WRAP_INPUTS.long = WRAP_INPUTS.medium.repeat(10);
WRAP_INPUTS.hardWrap = Array.from({length: 200}, (_, i) => `\x1b[${31 + (i % 7)}mLongword${i}coloredtext\x1b[0m`).join(
	' ',
);
WRAP_INPUTS.noTrimLong = '  ' + WRAP_INPUTS.long + '  ';

// Correctness: verify color preservation across line breaks
{
	const text = '\x1b[31mThis is a long red text that needs wrapping\x1b[0m';
	const wrapped = Bun.wrapAnsi(text, WRAP_COLS);
	const wrapLines = wrapped.split('\n');
	const allColored = wrapLines.every(l => l.includes('\x1b[31m'));
	const passColor = allColored ? o(S.green) : o(S.red);
	console.log(
		`  Color preservation: ${passColor}${allColored ? 'pass' : 'FAIL'}${R} (${wrapLines.length} lines, all re-open red)`,
	);
}

// Size benchmarks (matching Bun v1.3.7 release notes cases)
const wrapCases: [string, string, Parameters<typeof Bun.wrapAnsi>[2]][] = [
	['short (~45 chars)', WRAP_INPUTS.short, undefined],
	['medium (~810 chars)', WRAP_INPUTS.medium, undefined],
	['long (~8100 chars)', WRAP_INPUTS.long, undefined],
	['hard wrap colored', WRAP_INPUTS.hardWrap, {hard: true}],
	['no trim long', WRAP_INPUTS.noTrimLong, {trim: false}],
];

const wrapRows: {Case: string; Chars: number; Mean: string; Min: string; Max: string}[] = [];
for (const [name, input, opts] of wrapCases) {
	const r = bench(name, () => Bun.wrapAnsi(input, WRAP_COLS, opts));
	wrapRows.push({Case: name, Chars: input.length, Mean: fmt(r.mean_ns), Min: fmt(r.min_ns), Max: fmt(r.max_ns)});
}
// @ts-expect-error Bun.inspect.table accepts options as third arg
console.log(Bun.inspect.table(wrapRows, ['Case', 'Chars', 'Mean', 'Min', 'Max'], {colors: useColor}));

// Option variants (all on long input)
console.log(`  ${D}[option variants] (long input, 20 cols)${R}`);

const optCases: [string, Parameters<typeof Bun.wrapAnsi>[2]][] = [
	['default', undefined],
	['hard: true', {hard: true}],
	['wordWrap: false', {wordWrap: false}],
	['trim: false', {trim: false}],
	['ambiguousIsNarrow: false', {ambiguousIsNarrow: false}],
];

const optRows: {Option: string; Mean: string; Min: string}[] = [];
for (const [name, opts] of optCases) {
	const r = bench(name, () => Bun.wrapAnsi(WRAP_INPUTS.long, WRAP_COLS, opts));
	optRows.push({Option: name, Mean: fmt(r.mean_ns), Min: fmt(r.min_ns)});
}
// @ts-expect-error Bun.inspect.table accepts options as third arg
console.log(Bun.inspect.table(optRows, ['Option', 'Mean', 'Min'], {colors: useColor}));

// ── Bench 5: Bun.stringWidth ──────────────────────────────────────────
// Ref: https://bun.sh/docs/api/utils#bun-stringwidth
// Bun docs: ~6,756x faster string-width alternative (vs npm package).
// SIMD-optimized, supports ANSI codes, emoji, wide CJK characters.

sectionHeader('5. Bun.stringWidth', 'https://bun.sh/docs/api/utils#bun-stringwidth');

// Generate test inputs matching Bun benchmark categories
function repeat(s: string, n: number): string {
	let out = '';
	for (let i = 0; i < n; i++) out += s;
	return out;
}

const SW_ASCII_BASE = 'The quick brown fox jumps over the lazy dog. ';
const SW_EMOJI_BASE = 'Hello 🌍🎉 world 🚀💻 test 🔥⭐ data ';
const SW_ANSI_EMOJI_BASE = '\x1b[31m🔴 red\x1b[0m \x1b[32m🟢 green\x1b[0m ';
const SW_MIXED_BASE = '\x1b[1mBold\x1b[0m text 🎯 \x1b[36mcyan\x1b[0m 日本語 ';

const SW_INPUTS: Record<string, {label: string; value: string}> = {
	ascii5: {label: '5 chars ascii', value: 'hello'},
	ascii50: {label: '50 chars ascii', value: SW_ASCII_BASE.slice(0, 50)},
	ascii500: {label: '500 chars ascii', value: repeat(SW_ASCII_BASE, 12).slice(0, 500)},
	ascii5k: {label: '5,000 chars ascii', value: repeat(SW_ASCII_BASE, 115).slice(0, 5000)},
	ascii25k: {label: '25,000 chars ascii', value: repeat(SW_ASCII_BASE, 560).slice(0, 25000)},
	emoji7: {label: '7 chars ascii+emoji', value: 'Hi 🌍🎉!'},
	emoji70: {label: '70 chars ascii+emoji', value: repeat(SW_EMOJI_BASE, 2).slice(0, 70)},
	emoji700: {label: '700 chars ascii+emoji', value: repeat(SW_EMOJI_BASE, 20).slice(0, 700)},
	emoji7k: {label: '7,000 chars ascii+emoji', value: repeat(SW_EMOJI_BASE, 200).slice(0, 7000)},
	ansiEmoji8: {label: '8 chars ansi+emoji', value: '\x1b[31m🔴 hi\x1b[0m'},
	ansiEmoji80: {label: '80 chars ansi+emoji', value: repeat(SW_ANSI_EMOJI_BASE, 3).slice(0, 80)},
	ansiEmoji800: {label: '800 chars ansi+emoji', value: repeat(SW_ANSI_EMOJI_BASE, 30).slice(0, 800)},
	ansiEmoji8k: {label: '8,000 chars ansi+emoji', value: repeat(SW_ANSI_EMOJI_BASE, 300).slice(0, 8000)},
	mixed19: {label: '19 chars ansi+emoji+ascii', value: SW_MIXED_BASE.slice(0, 19)},
	mixed190: {label: '190 chars ansi+emoji+ascii', value: repeat(SW_MIXED_BASE, 6).slice(0, 190)},
	mixed1900: {label: '1,900 chars ansi+emoji+ascii', value: repeat(SW_MIXED_BASE, 60).slice(0, 1900)},
	mixed19k: {label: '19,000 chars ansi+emoji+ascii', value: repeat(SW_MIXED_BASE, 600).slice(0, 19000)},
};

// Correctness checks
{
	const plain = Bun.stringWidth('hello');
	checkPass('plain ascii', plain === 5, `"hello" → ${plain}`);

	const ansi = Bun.stringWidth('\x1b[31mhello\x1b[0m');
	checkPass('ANSI stripped', ansi === 5, `"\\x1b[31mhello\\x1b[0m" → ${ansi}`);

	const ansiCounted = Bun.stringWidth('\x1b[31mhello\x1b[0m', {countAnsiEscapeCodes: true});
	checkPass('ANSI counted', ansiCounted === 12, `countAnsiEscapeCodes: true → ${ansiCounted}`);

	const wide = Bun.stringWidth('日本語');
	checkPass('CJK wide chars', wide === 6, `"日本語" → ${wide} (3 chars × 2 cols)`);

	const emoji = Bun.stringWidth('🎉');
	checkPass('emoji width', emoji === 2, `"🎉" → ${emoji}`);

	const empty = Bun.stringWidth('');
	checkPass('empty string', empty === 0, `"" → ${empty}`);
}

// Size benchmarks (matching Bun doc categories)
console.log(`\n  ${D}[size scaling — default options]${R}`);

const swRows: {Input: string; Chars: number; Visible: number; Mean: string; Min: string; Max: string}[] = [];
for (const [, {label, value}] of Object.entries(SW_INPUTS)) {
	const r = bench(label, () => Bun.stringWidth(value));
	swRows.push({
		Input: label,
		Chars: value.length,
		Visible: Bun.stringWidth(value),
		Mean: fmt(r.mean_ns),
		Min: fmt(r.min_ns),
		Max: fmt(r.max_ns),
	});
}
// @ts-expect-error Bun.inspect.table accepts options as third arg
console.log(Bun.inspect.table(swRows, ['Input', 'Chars', 'Visible', 'Mean', 'Min', 'Max'], {colors: useColor}));

// Option variants
console.log(`  ${D}[option variants] (500 chars ascii)${R}`);

const swOptCases: [string, Parameters<typeof Bun.stringWidth>[1]][] = [
	['default', undefined],
	['countAnsiEscapeCodes: true', {countAnsiEscapeCodes: true}],
	['ambiguousIsNarrow: false', {ambiguousIsNarrow: false}],
];

const swOptRows: {Option: string; Mean: string; Min: string}[] = [];
for (const [name, opts] of swOptCases) {
	const input = SW_INPUTS.ascii500.value;
	const r = bench(name, () => Bun.stringWidth(input, opts));
	swOptRows.push({Option: name, Mean: fmt(r.mean_ns), Min: fmt(r.min_ns)});
}
// @ts-expect-error Bun.inspect.table accepts options as third arg
console.log(Bun.inspect.table(swOptRows, ['Option', 'Mean', 'Min'], {colors: useColor}));

// ── Summary ─────────────────────────────────────────────────────────

const {key: memberKey, profile: memberProfile} = await loadMemberProfile();
renderSummary({t0, iterLabel: `${ITERATIONS} (sync), 5000 (stream), 100 (subprocess)`, memberKey, memberProfile});
