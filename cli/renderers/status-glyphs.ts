// status-glyphs.ts — Tier-1380 Visual Telemetry

// ═══════════════════════════════════════════════════════════════
// UNICODE GLYPH REGISTRY — Semantic Status Indicators
// ═══════════════════════════════════════════════════════════════

const BUN_STATUS_GLYPHS = {
	// Tier 0: Critical (Red spectrum)
	critical: {glyph: '\u{1F534}', code: 'U+1F534', hsl: [0, 100, 50], ascii: '!!'},
	error:    {glyph: '\u2717',    code: 'U+2717',  hsl: [0, 80, 45],  ascii: 'X'},
	failed:   {glyph: '\u2716',    code: 'U+2716',  hsl: [0, 90, 40],  ascii: 'F'},

	// Tier 1: Warning (Orange/Yellow)
	warning: {glyph: '\u26A0', code: 'U+26A0', hsl: [35, 100, 50],  ascii: '!'},
	caution: {glyph: '\u25B5', code: 'U+25B5', hsl: [45, 100, 55],  ascii: '^'},

	// Tier 2: Success (Green spectrum)
	success: {glyph: '\u2713',    code: 'U+2713',  hsl: [120, 100, 40], ascii: 'Y'},
	passed:  {glyph: '\u2714',    code: 'U+2714',  hsl: [130, 90, 35],  ascii: 'P'},
	stable:  {glyph: '\u{1F7E2}', code: 'U+1F7E2', hsl: [140, 100, 45], ascii: 'S'},

	// Tier 3: Info (Blue/Cyan)
	info:    {glyph: '\u2139', code: 'U+2139', hsl: [200, 100, 50], ascii: 'i'},
	running: {glyph: '\u25C9', code: 'U+25C9', hsl: [190, 100, 50], ascii: '>'},
	pending: {glyph: '\u25CB', code: 'U+25CB', hsl: [210, 80, 60],  ascii: 'o'},

	// Tier 4: Neutral (Gray/White)
	neutral: {glyph: '\u25C6', code: 'U+25C6', hsl: [0, 0, 70], ascii: '-'},
	unknown: {glyph: '?',     code: 'U+003F', hsl: [0, 0, 50], ascii: '?'},
	skip:    {glyph: '\u2298', code: 'U+2298', hsl: [0, 0, 60], ascii: '/'},
} as const;

type StatusKey = keyof typeof BUN_STATUS_GLYPHS;

// ═══════════════════════════════════════════════════════════════
// PER-PROJECT HSL CONFIGURATION
// ═══════════════════════════════════════════════════════════════

interface ProjectConfig {
	namespace: string;
	statusHueOffset: number;
	saturationMod: number;
	lightnessMod: number;
	useUnicode: boolean;
	glyphWidth: number;
}

const DEFAULT_PROJECT = 'com.tier1380.scanner';

const BUN_PROJECT_PRESETS: Record<string, ProjectConfig> = {
	'com.tier1380.scanner': {
		namespace: 'com.tier1380.scanner',
		statusHueOffset: 15,
		saturationMod: 0.9,
		lightnessMod: 1.1,
		useUnicode: true,
		glyphWidth: 2,
	},
	'com.tier1380.mcp': {
		namespace: 'com.tier1380.mcp',
		statusHueOffset: 180,
		saturationMod: 1.2,
		lightnessMod: 0.9,
		useUnicode: true,
		glyphWidth: 2,
	},
	'legacy.cli': {
		namespace: 'legacy.cli',
		statusHueOffset: 0,
		saturationMod: 0,
		lightnessMod: 1.0,
		useUnicode: false,
		glyphWidth: 1,
	},
};

function getProjectConfig(project: string): ProjectConfig {
	return BUN_PROJECT_PRESETS[project] ?? BUN_PROJECT_PRESETS[DEFAULT_PROJECT];
}

// ═══════════════════════════════════════════════════════════════
// HSL COLOR GENERATOR (Bun.color integration)
// ═══════════════════════════════════════════════════════════════

function applyHsl(base: readonly [number, number, number], cfg: ProjectConfig): [number, number, number] {
	const h = (base[0] + cfg.statusHueOffset) % 360;
	const s = Math.min(100, base[1] * cfg.saturationMod);
	const l = Math.min(100, base[2] * cfg.lightnessMod);
	return [h, s, l];
}

const generateStatusColor = (
	status: StatusKey,
	project: string,
): {ansi: string; css: string; hex: string} => {
	const cfg = getProjectConfig(project);
	const [h, s, l] = applyHsl(BUN_STATUS_GLYPHS[status].hsl, cfg);
	const hslString = `hsl(${h}, ${s}%, ${l}%)`;

	return {
		ansi: Bun.color(hslString, 'ansi') ?? '',
		css: hslString,
		hex: Bun.color(hslString, 'hex') ?? '#000000',
	};
};

// ═══════════════════════════════════════════════════════════════
// UNICODE WIDTH HANDLING (Bun.stringWidth)
// ═══════════════════════════════════════════════════════════════

const formatStatusCell = (
	status: StatusKey,
	project: string,
	width: number = 10,
): string => {
	const cfg = getProjectConfig(project);
	const glyph = cfg.useUnicode ? BUN_STATUS_GLYPHS[status].glyph : BUN_STATUS_GLYPHS[status].ascii;
	const color = generateStatusColor(status, project);

	const displayWidth = Bun.stringWidth(glyph);
	const padding = Math.max(0, width - displayWidth);

	return `${color.ansi}${glyph}\x1b[0m${' '.repeat(padding)}`;
};

// ═══════════════════════════════════════════════════════════════
// STATUS MATRIX
// ═══════════════════════════════════════════════════════════════

interface StatusMetric {
	id: number;
	project: string;
	metric: string;
	value: string;
	status: StatusKey;
	hsl: [number, number, number];
	unicode: string;
	codePoint: string;
	width: number;
	risk: number;
	carbon: number;
}

const generateStatusMatrix = (project: string): StatusMetric[] => {
	const cfg = getProjectConfig(project);
	const metrics = [
		{m: 'CPU', v: '45%', s: 'stable' as StatusKey, r: 1.001},
		{m: 'Memory', v: '89MB', s: 'warning' as StatusKey, r: 1.05},
		{m: 'Latency', v: '189ns', s: 'success' as StatusKey, r: 1.0},
		{m: 'Errors', v: '3', s: 'critical' as StatusKey, r: 2.5},
		{m: 'Jobs', v: 'pending', s: 'pending' as StatusKey, r: 1.1},
	];

	return metrics.map((x, idx) => {
		const glyphData = BUN_STATUS_GLYPHS[x.s];
		const [h, s, l] = applyHsl(glyphData.hsl, cfg);

		return {
			id: idx,
			project,
			metric: x.m,
			value: x.v,
			status: x.s,
			hsl: [h, s, l],
			unicode: glyphData.glyph,
			codePoint: glyphData.code,
			width: Bun.stringWidth(glyphData.glyph),
			risk: x.r,
			carbon: Math.floor(x.r * 10),
		};
	});
};

// ═══════════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════════

const renderUnicodeMatrix = (project: string) => {
	const data = generateStatusMatrix(project);
	const cfg = getProjectConfig(project);

	console.log(`\nProject: ${cfg.namespace}`);
	console.log(`HSL Mod: hue+${cfg.statusHueOffset}, sat\u00d7${cfg.saturationMod}, light\u00d7${cfg.lightnessMod}\n`);

	const table = data.map(d => ({
		ID: d.id,
		Metric: d.metric,
		Value: d.value,
		Status: formatStatusCell(d.status, project, 6),
		HSL: `${d.hsl[0]},${d.hsl[1]}%,${d.hsl[2]}%`,
		Unicode: d.unicode,
		Code: d.codePoint,
		Width: d.width,
		Risk: d.risk.toFixed(3),
		Carbon: `${d.carbon}\u00b5g`,
	}));

	// @ts-expect-error Bun.inspect.table accepts options as third arg
	console.log(Bun.inspect.table(table, [
		'ID', 'Metric', 'Value', 'Status', 'HSL', 'Unicode', 'Code', 'Width', 'Risk', 'Carbon',
	], {colors: true}));

	const avgRisk = (data.reduce((a, b) => a + b.risk, 0) / data.length).toFixed(3);
	console.error(`\x1b[90m[Project:${project}|AvgR:${avgRisk}|Unicode:${cfg.useUnicode ? '\u2713' : '\u2717'}|Width:${cfg.glyphWidth}]\x1b[0m`);
};

// ═══════════════════════════════════════════════════════════════
// CLI EXECUTION
// ═══════════════════════════════════════════════════════════════

if (import.meta.main) {
	const project = process.argv[2] || DEFAULT_PROJECT;

	if (!BUN_PROJECT_PRESETS[project]) {
		console.error(`Unknown project: ${project}`);
		console.error(`Available: ${Object.keys(BUN_PROJECT_PRESETS).join(', ')}`);
		process.exit(1);
	}

	renderUnicodeMatrix(project);

	console.log('\nUnicode Width Verification:');
	for (const [, v] of Object.entries(BUN_STATUS_GLYPHS).slice(0, 3)) {
		const width = Bun.stringWidth(v.glyph);
		console.log(`  ${v.glyph} (${v.code}): width=${width}, bytes=${Buffer.byteLength(v.glyph, 'utf8')}`);
	}
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

export {
	BUN_STATUS_GLYPHS,
	BUN_PROJECT_PRESETS,
	generateStatusColor,
	formatStatusCell,
	generateStatusMatrix,
	renderUnicodeMatrix,
	getProjectConfig,
	applyHsl,
	type StatusKey,
	type ProjectConfig,
	type StatusMetric,
};
