// ── service-color-secrets.ts — Colored secret status matrix ──────────────
// Standalone CLI that renders a colored status matrix showing keychain
// secret availability per profile.

import {
	BUN_STATUS_GLYPHS,
	formatStatusCell,
	getProjectConfig,
	applyHsl,
	type StatusKey,
} from './cli/renderers/status-glyphs';
import {
	BUN_PROFILES_SECRET_NAMES,
	BUN_PROFILES_ENV_MAP,
	BUN_PROFILES_DEFAULT_NAMESPACE,
	deriveKeychainService,
	profileKeychainGet,
	type SecretName,
	type EnvVarName,
	type KeychainErrCode,
} from './profiles';

// ── Types ────────────────────────────────────────────────────────────────
export type SecretSource = 'keychain' | 'env' | 'missing';
export type SecretKeychainCode = 'ok' | 'empty' | KeychainErrCode;
export interface SecretStatus {
	name: SecretName;
	envVar: EnvVarName | null;
	status: StatusKey;
	source: SecretSource;
	keychainCode: SecretKeychainCode;
}

// ── Constants ────────────────────────────────────────────────────────────
export const BUN_SECRET_STATUS_COLUMNS = ['Secret', 'Status', 'Source', 'Env Var'] as const;

// ── ANSI color helpers ───────────────────────────────────────────────────
const _useColor = (() => {
	if (Bun.env.FORCE_COLOR) return true;
	if (Bun.env.NO_COLOR !== undefined) return false;
	return process.stdout.isTTY ?? false;
})();
const _wrap = (code: string) => (_useColor ? (s: string) => `\x1b[${code}m${s}\x1b[0m` : (s: string) => s);
const c = {
	bold: _wrap('1'),
	cyan: _wrap('36'),
	green: _wrap('32'),
	yellow: _wrap('33'),
	dim: _wrap('2'),
	magenta: _wrap('35'),
	red: _wrap('31'),
};

// ── Reverse env map: secret name → env var ───────────────────────────────
const _envBySecret = Object.fromEntries(Object.entries(BUN_PROFILES_ENV_MAP).map(([k, v]) => [v, k])) as Record<
	SecretName,
	EnvVarName
>;

// ── Status mapping ───────────────────────────────────────────────────────
// success (green check)     — secret found in keychain
// warning (orange triangle) — secret in env var only (should migrate)
// error   (red X)           — secret missing everywhere
const STATUS_MAP: Record<SecretSource, StatusKey> = {
	keychain: 'success',
	env: 'warning',
	missing: 'error',
};

// ── Core functions ───────────────────────────────────────────────────────
export async function resolveSecretStatuses(
	profile: string,
	namespace: string = BUN_PROFILES_DEFAULT_NAMESPACE,
): Promise<SecretStatus[]> {
	const service = deriveKeychainService(profile, namespace);
	const results: SecretStatus[] = [];

	for (const secretName of BUN_PROFILES_SECRET_NAMES) {
		const envVar = _envBySecret[secretName] ?? null;
		const keychainResult = await profileKeychainGet(service, secretName);
		const keychainCode = keychainResult.ok ? (keychainResult.value ? 'ok' : 'empty') : keychainResult.code;

		let source: SecretSource;
		if (keychainResult.ok && keychainResult.value) {
			source = 'keychain';
		} else if (envVar && Bun.env[envVar]) {
			source = 'env';
		} else {
			source = 'missing';
		}

		results.push({
			name: secretName,
			envVar,
			status: STATUS_MAP[source],
			source,
			keychainCode,
		});
	}

	return results;
}

export function renderSecretMatrix(
	statuses: SecretStatus[],
	profile: string,
	namespace: string = BUN_PROFILES_DEFAULT_NAMESPACE,
	verbose = false,
): void {
	const cfg = getProjectConfig(namespace);
	const service = deriveKeychainService(profile, namespace);

	// Header
	console.log(`${c.bold('Secret Status Matrix')} \u2014 profile ${c.cyan(profile)}`);
	console.log(`${c.dim('namespace:')} ${namespace}`);
	console.log(`${c.dim('service:')}   ${service}`);
	const hslInfo = `hue+${cfg.hueOffset} sat\u00D7${cfg.satMod} lit\u00D7${cfg.lightMod}`;
	console.log(`${c.dim('hsl mod:')}   ${hslInfo}\n`);

	// Build table rows with colored status glyphs
	const rows = statuses.map(s => {
		const base: Record<string, string> = {
			'Secret': s.name,
			'Status': formatStatusCell(s.status, cfg),
			'Source': s.source,
			'Env Var': s.envVar ? `$${s.envVar}` : c.dim('\u2014'),
		};
		if (verbose) {
			base['Keychain'] = s.keychainCode;
			base['HSL'] = applyHsl(BUN_STATUS_GLYPHS[s.status].hsl, cfg);
			if (s.envVar && Bun.env[s.envVar]) {
				const v = Bun.env[s.envVar]!;
				base['Env Value'] = v.length <= 8 ? v.slice(0, 2) + '****' : v.slice(0, 4) + '****' + v.slice(-4);
			} else {
				base['Env Value'] = c.dim('\u2014');
			}
		}
		return base;
	});

	const columns = verbose
		? [...BUN_SECRET_STATUS_COLUMNS, 'Keychain', 'HSL', 'Env Value']
		: [...BUN_SECRET_STATUS_COLUMNS];
	console.log(Bun.inspect.table(rows, columns, {colors: true}));

	// Summary line: found/total with color
	const found = statuses.filter(s => s.source !== 'missing').length;
	const total = statuses.length;
	const color = found === total ? c.green : found > 0 ? c.yellow : c.red;
	console.log(`${color(`${found}/${total}`)} secrets available`);
}

// ── CLI entry point (inside import.meta.main to avoid side effects on import) ──
if (import.meta.main) {
	const {parseArgs} = await import('node:util');
	const {values, positionals} = parseArgs({
		allowPositionals: true,
		args: Bun.argv.slice(2),
		options: {
			profile: {type: 'string', default: 'local'},
			namespace: {type: 'string', default: BUN_PROFILES_DEFAULT_NAMESPACE},
			verbose: {type: 'boolean', default: false},
		},
		strict: false,
	});

	const subcommand = positionals[0];

	if (subcommand === 'matrix') {
		const profile = String(values.profile ?? 'local');
		const namespace = String(values.namespace ?? BUN_PROFILES_DEFAULT_NAMESPACE);
		const verbose = !!values.verbose;
		const statuses = await resolveSecretStatuses(profile, namespace);
		renderSecretMatrix(statuses, profile, namespace, verbose);
	} else {
		console.log(`${c.bold('service-color-secrets.ts')} \u2014 secret status matrix\n`);
		console.log('commands:');
		console.log(`  ${c.cyan('matrix')} --profile=<name>  show secret availability matrix`);
		console.log('\noptions:');
		console.log(`  ${c.dim('--profile')}     profile name (default: local)`);
		console.log(`  ${c.dim('--namespace')}   namespace (default: ${BUN_PROFILES_DEFAULT_NAMESPACE})`);
		console.log(`  ${c.dim('--verbose')}      show keychain codes, HSL values, env values`);
	}
}
