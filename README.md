# security-scanner-api

Multi-project scanner for Bun monorepos. Scans `$BUN_PLATFORM_HOME` for all projects and reports on dependencies, configuration, security posture, and infrastructure consistency.

Built with [Bun](https://bun.sh).

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

## What the audit covers

- **Metadata**: author, license, description, engines.bun, repository
- **Lock & config**: lockfile type, configVersion, linker strategy, frozenLockfile
- **bunfig [install]**: exact, production, backend, minimumReleaseAge, saveTextLockfile, peer install, cache, security scanner
- **Registries**: registry consistency, scoped registries, auth readiness, .npmrc
- **Dependencies**: overrides/resolutions, peerDependencies, native deps, trustedDependencies
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

| File | Purpose |
|------|---------|
| `scan.ts` | Main scanner (~3500 lines) — CLI, scanning, audit, fix commands |
| `scan-columns.ts` | Column definitions for table output |
| `scan-worker.ts` | IPC worker for parallel project scanning |
| `scan.test.ts` | 59 tests covering utilities, TZ parsing, DNS TTL, and subprocess TZ verification |

### Key internals

- **IPC worker pool**: Uses `availableParallelism()` workers via `Bun.spawn` for concurrent project scanning, with `Promise.all` fallback (`--no-ipc`)
- **lockHash**: `Bun.hash.wyhash()` of lockfile content for content-based drift detection
- **`.env` parsing**: Reads `.env`, `.env.local`, `.env.production`, etc. with last-file-wins semantics matching Bun's load order
- **Notable deps detection**: Flags frameworks and key libraries (React, Next, Elysia, Hono, Prisma, etc.)
- **Native deps detection**: Pattern-matches `node-gyp`, `napi`, `prebuild`, `ffi-napi`, etc.
- **Trusted deps audit**: Cross-references against Bun's built-in default trusted list

## Tests

```bash
bun test scan.test.ts
```

59 tests across 8 describe blocks:

- `isFeatureFlagActive` — Bun feature flag semantics (`"1"`, `"true"` only)
- `classifyEnvFlag` — `DISABLE_`/`SKIP_` env var classification
- `effectiveLinker` — linker strategy resolution (bunfig > configVersion > default)
- `platformHelp` — cross-platform CLI hints (win32/mise.exe)
- `shouldWarnMise` — mise startup warning logic
- `parseTzFromEnv` — TZ extraction from .env contents (quoting, comments, multi-file)
- `parseEnvVar` — generic env var parsing (DNS TTL, DO_NOT_TRACK, etc.)
- `timezone subprocess` — real `Bun.spawn` tests verifying `--tz` flag, `getHours()` across zones, snapshot cross-timezone consistency

## License

Private.
