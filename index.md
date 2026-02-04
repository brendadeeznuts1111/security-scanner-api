# Scanner Documentation Index

## Core

| File              | Description                                              |
| ----------------- | -------------------------------------------------------- |
| scan.ts           | Main scanner — CLI, scanning, audit, fix commands        |
| scan-worker.ts    | IPC worker for parallel project scanning                 |
| scan-columns.ts   | Column definitions for table output                      |
| README.md         | Project overview, CLI modes, filters, architecture       |
| CONTRIBUTING.md   | Setup, code style, commit conventions                    |

## Renderers (`cli/renderers/`)

| File                         | Description                                                     |
| ---------------------------- | --------------------------------------------------------------- |
| bun-api-matrix.ts            | Official Bun API catalog (~155 entries) with doc links          |
| doc-cross-reference.ts       | API provenance, relationships, search keywords                  |
| packument-matrix.ts          | npm packument metadata rendering                                |
| process-management.ts        | Bun.spawn wrapper and process utilities                         |
| status-glyphs.ts             | Unicode status glyph registry with per-project HSL colors       |
| stream-converters.ts         | Native stream converter catalog                                 |
| stream-converters-enhanced.ts| Advanced stream processing with migration scoring               |
| stream-converter-scanner.ts  | Userland-to-native stream migration scanner                     |

## Libraries (`lib/`)

| File                      | Description                                  |
| ------------------------- | -------------------------------------------- |
| packument-zero-trust.ts   | Zero-trust npm registry resolver             |

## Benchmarks (`benchmarks/`)

| File                   | Description                                       |
| ---------------------- | ------------------------------------------------- |
| bun-api-snapshot.ts    | Dynamic API surface scanner with delta tracking    |
| bench-native.ts        | Native API replacement benchmarks                  |
| bench-core.ts          | Core operation benchmarks                          |
| bench-rss.ts           | RSS helper benchmarks                              |
| diagnostic-risk.ts     | Diagnostic risk scoring                            |
| team-init.ts           | Team member profile initialization                 |

## Profiles (`profiles/`)

| File       | Description                     |
| ---------- | ------------------------------- |
| CPU.*.md   | Bun CPU profiling snapshots     |

## See Also

- [Bun API Reference](https://bun.sh/docs/runtime/bun-apis)
- [Bun Security Scanner API](https://bun.sh/docs/install/security-scanner-api)
