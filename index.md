# Scanner Documentation Index

## Core

| File              | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `src/scan.ts`     | Main scanner — CLI, scanning, audit, fix commands        |
| `src/scan-worker.ts` | IPC worker for parallel project scanning                 |
| `src/scan-columns.ts` | Column definitions for table output                      |
| `src/cookie-sessions.ts` | Cookie session management with Bun.secrets            |
| `src/cookie-terminal.ts` | Terminal UI for cookie sessions                        |
| `src/project-utils.ts` | Project context utilities                               |
| `src/profiles.ts` | Bun.secrets integration                                 |
| `README.md`       | Project overview, CLI modes, quick reference              |
| `CONTRIBUTING.md` | Setup, code style, commit conventions                    |

## Libraries (`lib/`)

| File                      | Description                                  |
| ------------------------- | -------------------------------------------- |
| `r2-cookie-stream.ts`    | R2-backed cookie persistence with zstd compression |
| `r2-cookie-view.ts`      | Tier-1380 Uint8Array view + projectId + R2  |
| `packument-zero-trust.ts` | Zero-trust npm registry resolver             |
| `bun-validator.ts`       | Input validation utilities                   |

## Optimizations (`optimizations/`)

| File                      | Description                                  |
| ------------------------- | -------------------------------------------- |
| `runtime-optimizations.ts` | JSC/Bun runtime patterns (lazy stats, batched ops, generators, TypedArray risk) |
| `bun-optimizations.ts`    | Bun-native optimizations (monomorphic shapes, concurrency limiting) |

## Renderers (`cli/renderers/`)

| File                         | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| `status-glyphs.ts`           | Unicode status glyph registry with per-project HSL colors       |
| `bun-api-matrix.ts`          | Official Bun API catalog (~155 entries) with doc links          |
| `doc-cross-reference.ts`     | API provenance, relationships, search keywords                  |
| `packument-matrix.ts`        | npm packument metadata rendering                                |
| `process-management.ts`      | Bun.spawn wrapper and process utilities                         |
| `stream-converters.ts`       | Native stream converter catalog                                 |
| `stream-converters-enhanced.ts` | Advanced stream processing with migration scoring               |
| `stream-converter-scanner.ts` | Userland-to-native stream migration scanner                     |

## Benchmarks (`benchmarks/`)

| File                   | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `bun-api-snapshot.ts`  | Dynamic API surface scanner with delta tracking    |
| `bench-native.ts`      | Native API replacement benchmarks                  |
| `bench-core.ts`        | Core operation benchmarks                          |
| `bench-rss.ts`         | RSS helper benchmarks                              |
| `team-init.ts`         | Team member profile initialization                 |

## Cursor Rules (`.cursor/rules/`)

| File                         | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| `bun-runtime-patterns.mdc`   | Bun runtime optimizations and type safety patterns (always applies) |
| `cookie-session-patterns.mdc` | Cookie session management patterns (applies to cookie-*.ts)     |

## See Also

- [Bun API Reference](https://bun.sh/docs/runtime/bun-apis)
- [Bun Security Scanner API](https://bun.sh/docs/install/security-scanner-api)
- [Bun.secrets](https://bun.sh/docs/runtime/bun-apis#secrets)
