# Contributing

## Prerequisites

- [Bun](https://bun.sh) v1.2+

## Setup

```bash
git clone git@github.com:brendadeeznuts1111/security-scanner-api.git
cd security-scanner-api
```

No `bun install` needed — the scanner has zero runtime dependencies.

## Running

```bash
bun run scan.ts              # default table view
bun run scan.ts --audit      # full audit
bun run scan.ts --help       # all flags
```

## Tests

```bash
bun test scan.test.ts
```

All 59 tests must pass before submitting a PR. The test suite includes subprocess tests that spawn real Bun processes
with different `TZ` values, so they require a working `bun` binary on `$PATH`.

## Code style

- Single file architecture — `scan.ts` is the main entry point
- No external dependencies; uses Bun built-ins (`Bun.file`, `Bun.spawn`, `Bun.hash`, `parseArgs`)
- ANSI colors via the `c` helper object, no chalk/picocolors
- `--dry-run` support for every `--fix-*` command
- Observability over enforcement — show information, don't force decisions

## Adding a new `--fix-*` command

1. Add the flag to `parseArgs` options at the top of `scan.ts`
2. Add the fix handler after the existing fix blocks (search for `flags["fix-`)
3. Support `--dry-run` — preview changes without writing
4. Add relevant fields to the `ProjectInfo` interface if scanning new data
5. Surface the new data in `--inspect` and `--audit` output
6. Add tests to `scan.test.ts`
7. Update `--help` text and `README.md`

## Adding a new audit section

1. Add fields to `ProjectInfo` interface
2. Set defaults in `scanProject`
3. Parse the data during project scanning
4. Add display logic in the audit block
5. Add to `--inspect` output
6. Add tests

## Commit messages

Follow conventional commits:

```
feat: add new scanning capability
fix: correct TZ parsing for quoted values
docs: update README with new flags
```
