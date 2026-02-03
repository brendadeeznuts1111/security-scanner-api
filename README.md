# security-scanner-api

Multi-project scanner for Bun monorepos. Scans `$BUN_PLATFORM_HOME` for all projects and reports on dependencies, configuration, security posture, and infrastructure consistency.

Built with [Bun](https://bun.sh). Based on Bun's [Security Scanner API](https://bun.sh/docs/install/security-scanner-api) and the official [security-scanner-template](https://github.com/oven-sh/security-scanner-template).

## Quick start

```bash
bun run scan.ts              # table of all projects
bun run scan.ts --audit      # full security + infra audit
bun run scan.ts --inspect <name>  # deep view of a single project
```

## Modes

| Flag | Description |
|------|-------------|
| `(default)` | Table of all projects with deps, engine, lock, bunfig status |
| `--detail` | Extended table (author, license, description) |
| `--inspect <name>` | Deep view of a single project |
| `--json` | JSON output |
| `--audit` | Metadata, infra, lifecycle security report with snapshots |
| `--fix [--dry-run]` | Patch missing author/license, init missing package.json |
| `--fix-engine [--dry-run]` | Unify `engines.bun` across all projects |
| `--fix-registry <url> [--dry-run]` | Unify registry (bunfig + pkg + .npmrc) |
| `--fix-scopes <url> @s.. [--dry-run]` | Inject `[install.scopes]` into bunfig.toml |
| `--fix-npmrc <url> @s.. [--dry-run]` | Rewrite .npmrc with scoped template |
| `--fix-trusted [--dry-run]` | Auto-detect native deps and add to trustedDependencies |
| `--fix-env-docs` | Inject audit recommendations into .env.template |
| `--fix-dns [--dry-run]` | Set DNS TTL + generate prefetch snippets |
| `--fix-dns-ttl [--dry-run]` | Write `BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5` to .env |
| `--why <pkg> [--top] [--depth N]` | `bun why` across all projects |
| `--outdated [-r] [--wf] [-p]` | `bun outdated` across all projects |
| `--update [--dry-run]` | `bun update` across all projects |
| `--update --patch [--dry-run]` | Update patch-level bumps only |
| `--update --minor [--dry-run]` | Update minor + patch bumps only |
| `--verify` | `bun install --frozen-lockfile` across all projects |
| `--info <pkg> [--json]` | Registry metadata + local cross-reference |
| `--path` | Emit `export PATH` for projects with `bin/` |
| `--snapshot` | Save cross-reference snapshot |
| `--compare` | Compare against previous snapshot |

## Filters

| Flag | Description |
|------|-------------|
| `--filter <glob\|bool>` | Filter by name, folder, or boolean field |
| `--with-bunfig` | Only projects with bunfig.toml |
| `--workspaces` | Only workspace roots |
| `--without-pkg` | Only dirs missing package.json |
| `--sort <key>` | Sort by name, deps, version, lock |
| `-p, --production` | Exclude devDependencies |
| `-g, --global` | Check global packages |
| `-r, --catalog` | Catalog dependencies (workspace roots) |
| `--wf <workspace>` | Filter by workspace name (repeatable) |
| `--omit <type>` | Skip dev, optional, or peer |

## Timezone support

The scanner tracks per-project timezone configuration from `.env` files.

```bash
bun run scan.ts --tz=America/New_York   # override timezone for this run
TZ=Asia/Tokyo bun run scan.ts           # or via env var
```

- `--tz` flag or `TZ` env var overrides the scan timezone
- Per-project `TZ` is read from `.env` files (last file wins per Bun load order)
- Defaults to UTC when no project-level TZ is found
- `bun test` forces UTC for deterministic tests; subprocess tests verify real TZ behavior

## DNS TTL

Scans for `BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS` in each project's `.env` files. The `--fix-dns-ttl` flag writes the recommended value of `5` seconds (per [Bun docs](https://bun.sh/docs/runtime/networking/dns)) to projects missing it.

```bash
bun run scan.ts --fix-dns-ttl --dry-run  # preview changes
bun run scan.ts --fix-dns-ttl            # apply
```

## Advisory levels

Bun's security scanner API uses two advisory levels to control installation behavior:

| Level | Behavior | Examples |
|-------|----------|----------|
| **Fatal** (`fatal`) | Installation stops immediately | malware, token stealers, backdoors, critical vulnerabilities |
| **Warning** (`warn`) | User prompted in TTY, auto-cancelled in non-TTY | protestware, adware, deprecated packages |

All advisories are displayed to the user regardless of level. If the `scan` function throws, installation is cancelled as a defensive precaution.

The scanner audits whether each project has a security scanner configured via `bunfig.toml`:

```toml
[install.security]
scanner = "@acme/bun-security-scanner"
```

See [Bun Security Scanner API docs](https://bun.sh/docs/install/security-scanner-api) for the full `Bun.Security.Scanner` interface.

### Error handling

If a scanner's `scan` function throws an error, Bun handles it gracefully but **cancels the installation** as a defensive precaution. When fetching threat feeds over the network, use schema validation (e.g., Zod) to ensure data integrity — invalid responses should fail immediately rather than silently returning empty advisories.

### Validation

```typescript
import {z} from 'zod';

const ThreatFeedItemSchema = z.object({
	package: z.string(),
	version: z.string(),
	url: z.string().nullable(),
	description: z.string().nullable(),
	categories: z.array(z.enum(['backdoor', 'botnet', 'malware', 'protestware', 'adware'])),
});
```

### Useful Bun APIs

- [`Bun.hash`](https://bun.sh/docs/runtime/hashing#bun-hash) — non-cryptographic hashing for package integrity checks. Accepts string, TypedArray, DataView, ArrayBuffer, or SharedArrayBuffer. Optional seed parameter (use BigInt for seeds above `Number.MAX_SAFE_INTEGER`):

  ```typescript
  Bun.hash("some data here");          // 11562320457524636935n (wyhash, 64-bit)
  Bun.hash("some data here", 1234);    // 15724820720172937558n (seeded)

  const arr = new Uint8Array([1, 2, 3, 4]);
  Bun.hash(arr);                       // TypedArray
  Bun.hash(arr.buffer);                // ArrayBuffer
  Bun.hash(new DataView(arr.buffer));  // DataView
  ```

  12 algorithms available, all with the same `(data, seed)` API:

  | 64-bit (bigint) | 32-bit (number) |
  |-----------------|-----------------|
  | `Bun.hash.wyhash()` | `Bun.hash.crc32()` |
  | `Bun.hash.cityHash64()` | `Bun.hash.adler32()` |
  | `Bun.hash.xxHash64()` | `Bun.hash.cityHash32()` |
  | `Bun.hash.xxHash3()` | `Bun.hash.xxHash32()` |
  | `Bun.hash.murmur64v2()` | `Bun.hash.murmur32v3()` |
  | `Bun.hash.rapidhash()` | `Bun.hash.murmur32v2()` |

  The scanner uses `Bun.hash.wyhash()` for lockfile content hashing (drift detection).

- [`Bun.semver`](https://bun.sh/docs/api/semver) — native semver operations, no external dependencies:

  ```typescript
  // Vulnerability range matching (used by isVulnerable)
  Bun.semver.satisfies("3.3.6", ">=3.3.6 <4.0.0"); // true — event-stream incident
  Bun.semver.satisfies("4.0.0", ">=3.3.6 <4.0.0"); // false
  Bun.semver.satisfies("1.3.0", "^1.2.0");          // true
  Bun.semver.satisfies("1.3.0", "~1.2.0");          // false

  // Version ordering (used by semverCompare, --update --patch/--minor)
  Bun.semver.order("2.0.0", "1.0.0");  //  1
  Bun.semver.order("1.0.0", "2.0.0");  // -1
  Bun.semver.order("1.0.0", "1.0.0");  //  0
  ```
- [`Bun.file`](https://bun.sh/docs/api/file-io) — efficient file I/O for reading local threat databases
- [`dns.getCacheStats()`](https://bun.sh/docs/runtime/networking/dns) — DNS cache statistics for monitoring prefetch effectiveness

## What the audit covers

- **Metadata**: author, license, description, engines.bun, repository
- **Lock & config**: lockfile type, configVersion, linker strategy, frozenLockfile, lockfile.save, lockfile.print
- **bunfig [install]**: auto, frozenLockfile, dryRun, production, exact, optional, dev, peer, linker, backend, minimumReleaseAge (+ excludes), saveTextLockfile, linkWorkspacePackages, cache (disable, dir, disableManifest), globalDir, globalBinDir, ca/cafile, noVerify, verbose, silent, concurrentScripts, networkConcurrency, targetCpu, targetOs, install.security.scanner, trustedDependencies
- **bunfig [run]**: shell (`"system"` | `"bun"`), bun (node → bun alias), silent
- **bunfig [debug]**: editor (Bun.openInEditor)
- **Registries**: registry consistency, scoped registries, auth readiness, .npmrc
- **Dependencies**: overrides/resolutions, peerDependencies (+ peerDependenciesMeta optional), native deps, trustedDependencies
- **Env vars**: `DO_NOT_TRACK`, `DISABLE_BUN_ANALYTICS`, `BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS`, `TZ`, and more
- **Cross-reference**: lockHash-based drift detection, snapshot comparison with delta reporting
- **Per-project**: timezone, DNS TTL, workspace membership, git repo normalization

## Cross-reference snapshots

The audit generates cross-reference snapshots that track every resolved dependency version across all projects. Snapshots use `Bun.hash.wyhash()` content hashing on lockfiles to detect drift.

```bash
bun run scan.ts --audit                  # auto-saves snapshot
bun run scan.ts --compare                # compare against last snapshot
bun run scan.ts --audit-compare <file>   # compare against specific snapshot
```

The lockHash skip optimization reuses cached entries for unchanged projects when comparing against a previous snapshot.

## Architecture

```
scanner/
├── scan.ts                              Main scanner — CLI, scanning, audit, fix commands
├── scan-worker.ts                       IPC worker for parallel project scanning
├── scan-columns.ts                      Column definitions for table output
├── scan.test.ts                         Main test suite
├── cli/renderers/
│   ├── bun-api-matrix.ts                Bun API catalog (~155 entries) with doc links
│   ├── doc-cross-reference.ts           API provenance, relationships, search keywords
│   ├── packument-matrix.ts              npm packument metadata rendering
│   ├── process-management.ts            Bun.spawn wrapper and process utilities
│   ├── stream-converters.ts             Native stream converter catalog
│   ├── stream-converters-enhanced.ts    Advanced stream processing patterns
│   └── stream-converter-scanner.ts      Userland → native migration scanner
├── lib/
│   └── packument-zero-trust.ts          Zero-trust npm registry resolver
└── benchmarks/
    ├── bun-api-snapshot.ts              Dynamic API surface scanner with delta tracking
    ├── bench-native.ts                  Native API replacement benchmarks
    ├── bench-rss.ts                     RSS helper benchmarks
    └── team-init.ts                     Team member profile initialization
```

### Key internals

- **IPC worker pool**: Uses `availableParallelism()` workers via `Bun.spawn` for concurrent project scanning, with `Promise.all` fallback (`--no-ipc`)
- **lockHash**: `Bun.hash.wyhash()` of lockfile content for content-based drift detection
- **Bun.semver**: `isVulnerable()` for threat feed range matching, `semverCompare()` for version ordering, `semverBumpType()` for `--update --patch/--minor` filtering
- **`.env` parsing**: Reads `.env`, `.env.local`, `.env.production`, etc. with last-file-wins semantics matching Bun's load order
- **Notable deps detection**: Flags frameworks and key libraries (React, Next, Elysia, Hono, Prisma, etc.)
- **Native deps detection**: Pattern-matches `node-gyp`, `napi`, `prebuild`, `ffi-napi`, etc.
- **Trusted deps audit**: Cross-references against Bun's built-in default trusted list
- **Bun API catalog**: 155+ APIs cataloged with category, stability status, surface area, and doc URLs (`BUN_DOC_BASE = "https://bun.sh/docs"`)
- **Doc cross-reference**: API provenance (which Bun version introduced each API), related API graph, search keywords, and performance annotations
- **Stream converters**: Catalog of 11 native `Bun.readableStreamTo*` converters with spawn pipeline mappings and a migration scanner for replacing userland patterns
- **Process management**: Ergonomic wrapper around `Bun.spawn`/`Bun.spawnSync` with stream routing, IPC config, and environment management
- **Zero-trust packument resolver**: Schema-validated npm registry queries via `lib/packument-zero-trust.ts`

## Tests

```bash
bun test                    # all 11 test files
bun test scan.test.ts       # main scanner tests only
```

404 tests, 6692 expects across 11 files:

| File | Coverage |
|------|----------|
| `scan.test.ts` | Feature flags, env classification, linker resolution, platform hints, TZ parsing, Bun.semver, Zod schemas, Bun.hash (12 algorithms), DNS cache, timezone subprocess |
| `bun-api-matrix.test.ts` | API catalog integrity, category filtering, doc URL validation, scanner usage set |
| `doc-cross-reference.test.ts` | Provenance data, related API graph, search keywords, perf annotations |
| `packument-matrix.test.ts` | Byte formatting, person formatting, renderer output |
| `stream-converter.test.ts` | Converter catalog, output types, spawn pipeline routes |
| `stream-converters.test.ts` | Enhanced converters, migration weights, matrix entries |
| `stream-converter-scanner.test.ts` | Detection patterns, rule matching, migration suggestions |
| `stream-converters-shell.test.ts` | Shell-based stream conversion patterns |
| `bun-process.test.ts` | Process management, stream config |
| `packument-zero-trust.test.ts` | Registry resolver, schema validation |
| `bun-native-api.test.ts` | Native API behavior and signature validation |

## Code quality

ESLint with `@typescript-eslint/naming-convention` enforces a 5-rule naming convention across all `*.ts` files:

| Rule | Scope | Format |
|------|-------|--------|
| 1 | Exported `SCREAMING_SNAKE_CASE` constants | Must start with `BUN_` |
| 2 | Exported non-SCREAMING constants | `PascalCase` or `camelCase` |
| 3 | Non-exported constants | `UPPER_CASE`, `camelCase`, or `PascalCase` |
| 4 | Exported classes and enums | `PascalCase` |
| 5 | Exported functions | `camelCase` |

```bash
bun run lint                # check
bun run lint:fix            # auto-fix
```

A husky pre-commit hook runs `bun lint` on every commit.

## References

- [Bun Security Scanner API](https://bun.sh/docs/install/security-scanner-api)
- [Bun API Reference](https://bun.sh/docs/runtime/bun-apis)
- [oven-sh/security-scanner-template](https://github.com/oven-sh/security-scanner-template)

## License

[MIT](LICENSE)
