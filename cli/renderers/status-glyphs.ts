export type StatusKey = 'success' | 'warning' | 'error' | 'info';
export type HslTuple = [h: number, s: number, l: number];

export const BUN_STATUS_GLYPHS: Record<StatusKey, {glyph: string; ascii: string; hsl: HslTuple}> = {
	success: {glyph: '✓', ascii: 'OK', hsl: [120, 100, 40]},
	warning: {glyph: '⚠', ascii: 'WARN', hsl: [35, 100, 50]},
	error: {glyph: '✗', ascii: 'ERR', hsl: [0, 80, 45]},
	info: {glyph: '•', ascii: 'INFO', hsl: [200, 100, 50]},
};

export type ProjectConfig = {
	namespace: string;
	hueOffset: number;
	satMod: number;
	lightMod: number;
	useUnicode: boolean;
};

export function getProjectConfig(namespace: string): ProjectConfig {
	const hueOffset = Number(Bun.hash.wyhash(namespace)) % 360;
	return {
		namespace,
		hueOffset,
		satMod: 0.9,
		lightMod: 1.0,
		useUnicode: true,
	};
}

export function applyHsl(base: HslTuple, cfg: ProjectConfig): string {
	const h = (base[0] + cfg.hueOffset) % 360;
	const s = Math.min(100, Math.max(0, base[1] * cfg.satMod));
	const l = Math.min(100, Math.max(0, base[2] * cfg.lightMod));
	return `hsl(${h}, ${s}%, ${l}%)`;
}

export function formatStatusCell(status: StatusKey, cfg: ProjectConfig): string {
	const entry = BUN_STATUS_GLYPHS[status];
	const glyph = cfg.useUnicode ? entry.glyph : entry.ascii;
	const color = Bun.color(applyHsl(entry.hsl, cfg), 'ansi');
	return `${color}${glyph}\x1b[0m`;
}
