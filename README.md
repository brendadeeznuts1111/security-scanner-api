# security-scanner-api

Multi-project scanner for Bun monorepos. Scans `$BUN_PLATFORM_HOME` for all projects and reports on dependencies, configuration, security posture, and infrastructure consistency.

Built with [Bun](https://bun.sh). Based on Bun's [Security Scanner API](https://bun.sh/docs/install/security-scanner-api).

## Quick start

```bash
bun run scan.ts              # table of all projects
bun run scan.ts --audit      # full security + infra audit
bun run scan.ts --inspect <name>  # deep view of a single project
```

## Modes

| Flag                                  | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| `(default)`                           | Table of all projects with deps, engine, lock, bunfig status |
| `--detail`                            | Extended table (author, license, description)                |
| `--inspect <name>`                    | Deep view of a single project                                |
| `--json`                              | JSON output                                                  |
| `--audit`                             | Metadata, infra, lifecycle security report with snapshots    |
| `--fix [--dry-run]`                   | Patch missing author/license, init missing package.json      |
| `--fix-engine [--dry-run]`            | Unify `engines.bun` across all projects                      |
| `--fix-registry <url> [--dry-run]`    | Unify registry (bunfig + pkg + .npmrc)                       |
| `--fix-scopes <url> @s.. [--dry-run]` | Inject `[install.scopes]` into bunfig.toml                   |
| `--fix-npmrc <url> @s.. [--dry-run]`  | Rewrite .npmrc with scoped template                          |
| `--fix-trusted [--dry-run]`           | Auto-detect native deps and add to trustedDependencies       |
| `--fix-dns [--dry-run]`               | Set DNS TTL + generate prefetch snippets                     |
| `--why <pkg> [--top] [--depth N]`     | `bun why` across all projects                                |
| `--outdated [-r] [--wf] [-p]`         | `bun outdated` across all projects                           |
| `--update [--dry-run]`                | `bun update` across all projects                             |
| `--verify`                            | `bun install --frozen-lockfile` across all projects          |
| `--info <pkg> [--json]`               | Registry metadata + local cross-reference                    |
| `--snapshot`                          | Save cross-reference snapshot                                |
| `--compare`                           | Compare against previous snapshot                            |

## Cookie Sessions

Manage cookie sessions with Bun.secrets storage:

```bash
# Create session
bun run scan.ts --session-create <project-id> --domain <domain> [--ttl <ms>] [--interactive]

# List sessions (uses PROJECT_ID env var or 'default' if omitted)
PROJECT_ID=myproj bun run scan.ts --session-list [project-id]

# Show session details
bun run scan.ts --session-show <session-id> [project-id]

# Add cookies
bun run scan.ts --cookie-add <session-id> [project-id] <cookie-string>

# Remove cookie
bun run scan.ts --cookie-remove <session-id> [project-id] <cookie-name>

# Monitor session
bun run scan.ts --session-monitor <session-id> [project-id]

# Cleanup expired
bun run scan.ts --session-cleanup [project-id]
```

**Environment variables:**
- `PROJECT_ID` or `FW_PROJECT_ID` — default project ID when not specified as positional
- `R2_BUCKET` or `R2_BUCKET_NAME` — R2 bucket for cookie storage (optional)

## Filters

| Flag                    | Description                              |
| ----------------------- | ---------------------------------------- |
| `--filter <glob\|bool>` | Filter by name, folder, or boolean field |
| `--with-bunfig`         | Only projects with bunfig.toml           |
| `--workspaces`          | Only workspace roots                     |
| `--without-pkg`         | Only dirs missing package.json           |
| `--sort <key>`          | Sort by name, deps, version, lock        |
| `-p, --production`      | Exclude devDependencies                  |
| `-r, --catalog`         | Catalog dependencies (workspace roots)   |
| `--wf <workspace>`      | Filter by workspace name (repeatable)    |

## Architecture

```
scanner/
├── src/
│   ├── scan.ts                    Main scanner — CLI, scanning, audit, fix commands
│   ├── scan-worker.ts             IPC worker for parallel project scanning
│   ├── scan-columns.ts            Column definitions for table output
│   ├── cookie-sessions.ts         Cookie session management with Bun.secrets
│   ├── cookie-terminal.ts         Terminal UI for cookie sessions
│   ├── project-utils.ts           Project context utilities
│   └── profiles.ts                 Bun.secrets integration
├── lib/
│   ├── r2-cookie-stream.ts        R2-backed cookie persistence with zstd
│   ├── r2-cookie-view.ts          Tier-1380 Uint8Array view + projectId + R2
│   └── packument-zero-trust.ts    Zero-trust npm registry resolver
├── optimizations/
│   ├── runtime-optimizations.ts   JSC/Bun runtime patterns (lazy stats, batched ops, generators)
│   └── bun-optimizations.ts       Bun-native optimizations (monomorphic shapes, concurrency)
├── cli/renderers/
│   ├── status-glyphs.ts           Unicode status glyph registry with per-project HSL colors
│   ├── bun-api-matrix.ts          Bun API catalog (~155 entries) with doc links
│   └── stream-converters.ts       Native stream converter catalog
└── benchmarks/
    └── bun-api-snapshot.ts         Dynamic API surface scanner
```

### Key Features

- **IPC worker pool**: Uses `availableParallelism()` workers via `Bun.spawn` for concurrent scanning
- **Bun.secrets**: Cookie sessions stored in OS keychain (macOS Keychain, Linux libsecret, Windows Credential Manager)
- **Runtime optimizations**: Lazy stats, batched operations, monomorphic shapes, generator backpressure
- **R2 integration**: Optional R2 storage for cookies with zstd compression and Uint8Array views
- **Type safety**: Full TypeScript types, no `as any` casts
- **lockHash**: `Bun.hash.wyhash()` of lockfile content for drift detection

## Tests

```bash
bun test                    # all tests
bun test scan.test.ts       # main scanner tests
bun test cli/renderers/     # renderer tests
bun test optimizations/     # runtime optimization tests
```

## Code Style

- No external dependencies; uses Bun built-ins (`Bun.file`, `Bun.spawn`, `Bun.hash`, `Bun.secrets`)
- Type safety: use `createProjectContext()` for typed `ProjectInfo`, avoid `as any`
- Runtime patterns: lazy stats, batched ops, monomorphic shapes (see `.cursor/rules/`)
- `--dry-run` support for every `--fix-*` command

## References

- [Bun Security Scanner API](https://bun.sh/docs/install/security-scanner-api)
- [Bun API Reference](https://bun.sh/docs/runtime/bun-apis)
- [Bun.secrets](https://bun.sh/docs/runtime/bun-apis#secrets)

## License

[MIT](LICENSE)
