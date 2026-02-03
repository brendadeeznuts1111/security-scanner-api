/**
 * Bun API Snapshot Generator
 *
 * Dynamically scans scan.ts and cross-references every Bun native API call
 * against the running Bun runtime surface, documentation URLs, and unicode status.
 *
 * Run:  bun run benchmarks/bun-api-snapshot.ts
 * Save: bun run benchmarks/bun-api-snapshot.ts > benchmarks/bun-api-snapshot.json
 */

const SCAN_PATH = `${import.meta.dir}/../scan.ts`;
const source = await Bun.file(SCAN_PATH).text();
const lines = source.split("\n");

// ── API registry: pattern → metadata ────────────────────────────────

type UnicodeStatus = "full" | "passthrough" | "binary" | "n/a";

interface ApiDef {
  pattern: RegExp;
  api: string;
  doc: string;
  since: string;
  unicode: UnicodeStatus;
  note: string;
}

const API_DEFS: ApiDef[] = [
  { pattern: /Bun\.argv/g, api: "Bun.argv", doc: "https://bun.sh/docs/runtime/configuration#argv", since: "1.0.0", unicode: "passthrough", note: "CLI arg parsing; passes raw strings" },
  { pattern: /Bun\.env\b/g, api: "Bun.env", doc: "https://bun.sh/docs/runtime/env", since: "1.0.0", unicode: "passthrough", note: "Environment variable access; returns string|undefined" },
  { pattern: /Bun\.stringWidth/g, api: "Bun.stringWidth", doc: "https://bun.sh/docs/runtime/utils#bun-stringwidth", since: "1.0.0", unicode: "full", note: "ICU-aware display width; handles CJK double-width, emoji, combining marks" },
  { pattern: /Bun\.semver\.satisfies/g, api: "Bun.semver.satisfies", doc: "https://bun.sh/docs/runtime/utils#bun-semver", since: "1.0.0", unicode: "n/a", note: "Semver range matching; ASCII-only input" },
  { pattern: /Bun\.semver\.order/g, api: "Bun.semver.order", doc: "https://bun.sh/docs/runtime/utils#bun-semver", since: "1.0.0", unicode: "n/a", note: "Semver comparison; returns -1|0|1" },
  { pattern: /Bun\.stripANSI/g, api: "Bun.stripANSI", doc: "https://bun.sh/docs/runtime/utils#bun-stripansi", since: "1.0.0", unicode: "full", note: "Zig+SIMD ANSI stripping; handles all CSI sequences" },
  { pattern: /Bun\.version\b/g, api: "Bun.version", doc: "https://bun.sh/docs/runtime/configuration#version", since: "1.0.0", unicode: "n/a", note: "Semver string of running Bun" },
  { pattern: /Bun\.revision/g, api: "Bun.revision", doc: "https://bun.sh/docs/runtime/configuration#revision", since: "1.0.0", unicode: "n/a", note: "Git SHA of running Bun build" },
  { pattern: /Bun\.spawn\b(?!Sync)/g, api: "Bun.spawn", doc: "https://bun.sh/docs/api/spawn", since: "1.0.0", unicode: "passthrough", note: "Async subprocess; stdout→pipe (ReadableStream), stderr→inherit (undefined)" },
  { pattern: /Bun\.spawnSync/g, api: "Bun.spawnSync", doc: "https://bun.sh/docs/api/spawn#blocking-api-bun-spawnsync", since: "1.0.0", unicode: "passthrough", note: "Sync subprocess; returns Buffer for stdout/stderr" },
  { pattern: /Bun\.file\b/g, api: "Bun.file", doc: "https://bun.sh/docs/api/file-io#reading-files-bun-file", since: "1.0.0", unicode: "full", note: "Lazy file reference; .text() returns UTF-8; .json() parses; .exists() checks" },
  { pattern: /Bun\.write\b/g, api: "Bun.write", doc: "https://bun.sh/docs/api/file-io#writing-files-bun-write", since: "1.0.0", unicode: "full", note: "Atomic file write; accepts string (UTF-8) or Uint8Array" },
  { pattern: /Bun\.hash\.\w+/g, api: "Bun.hash.*", doc: "https://bun.sh/docs/api/hashing#bun-hash", since: "1.0.0", unicode: "binary", note: "Fast non-crypto hash; input treated as raw bytes" },
  { pattern: /Bun\.fileURLToPath/g, api: "Bun.fileURLToPath", doc: "https://bun.sh/docs/runtime/utils#bun-fileurltopath", since: "1.0.0", unicode: "full", note: "Decodes %20, %C3%AB, CJK percent-encoding; URL.pathname does NOT decode" },
  { pattern: /new Bun\.Glob\b/g, api: "Bun.Glob", doc: "https://bun.sh/docs/api/glob", since: "1.0.0", unicode: "full", note: "Native glob matching; handles unicode filenames" },
  { pattern: /Bun\.inspect\.table/g, api: "Bun.inspect.table", doc: "https://bun.sh/docs/runtime/utils#bun-inspect-table", since: "1.0.0", unicode: "full", note: "Formatted table output with ANSI colors; uses Bun.stringWidth for alignment" },
  { pattern: /Bun\.nanoseconds/g, api: "Bun.nanoseconds", doc: "https://bun.sh/docs/runtime/utils#bun-nanoseconds", since: "1.0.0", unicode: "n/a", note: "High-precision timer; nanoseconds since process start" },
  { pattern: /Bun\.gc\b/g, api: "Bun.gc", doc: "https://bun.sh/docs/runtime/utils#bun-gc", since: "1.0.0", unicode: "n/a", note: "Manual garbage collection trigger" },
  { pattern: /Bun\.openInEditor/g, api: "Bun.openInEditor", doc: "https://bun.sh/docs/runtime/utils#bun-openineditor", since: "1.0.0", unicode: "full", note: "Opens file in configured editor" },
  { pattern: /Bun\.color\b/g, api: "Bun.color", doc: "https://bun.sh/docs/runtime/utils#bun-color", since: "1.0.0", unicode: "n/a", note: "Color parsing and conversion" },
  { pattern: /Bun\.wrapAnsi/g, api: "Bun.wrapAnsi", doc: "https://bun.sh/docs/runtime/utils#bun-wrapansi", since: "1.0.0", unicode: "full", note: "ANSI-aware word wrapping" },
  { pattern: /Bun\.pathToFileURL/g, api: "Bun.pathToFileURL", doc: "https://bun.sh/docs/runtime/utils#bun-pathtofileurl", since: "1.0.0", unicode: "full", note: "Converts absolute path to file:// URL" },
  { pattern: /proc\.stdout\.text\(\)/g, api: "proc.stdout.text()", doc: "https://bun.sh/docs/api/spawn#reading-stdout", since: "1.0.0", unicode: "full", note: "Bun body-mixin on ReadableStream; decodes UTF-8" },
  { pattern: /proc\.stderr\.text\(\)/g, api: "proc.stderr.text()", doc: "https://bun.sh/docs/api/spawn#reading-stdout", since: "1.0.0", unicode: "full", note: "Requires stderr:'pipe'; defaults to inherit (undefined) if not set" },
  { pattern: /import\.meta\.dir/g, api: "import.meta.dir", doc: "https://bun.sh/docs/api/import-meta", since: "1.0.0", unicode: "full", note: "Directory of current file; handles unicode paths" },
  { pattern: /import\.meta\.url/g, api: "import.meta.url", doc: "https://bun.sh/docs/api/import-meta", since: "1.0.0", unicode: "full", note: "file:// URL of current file" },
  { pattern: /import\.meta\.main/g, api: "import.meta.main", doc: "https://bun.sh/docs/api/import-meta", since: "1.0.0", unicode: "n/a", note: "true if file is direct entry point" },
];

// ── Scan source for matches ─────────────────────────────────────────

interface ApiResult {
  api: string;
  doc: string;
  since: string;
  lines: number[];
  calls: number;
  unicode: UnicodeStatus;
  note: string;
}

const results: ApiResult[] = [];

for (const def of API_DEFS) {
  const matchLines: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    // Reset regex state for each line
    def.pattern.lastIndex = 0;
    if (def.pattern.test(lines[i])) {
      matchLines.push(i + 1); // 1-indexed
    }
  }

  if (matchLines.length > 0) {
    results.push({
      api: def.api,
      doc: def.doc,
      since: def.since,
      lines: matchLines,
      calls: matchLines.length,
      unicode: def.unicode,
      note: def.note,
    });
  }
}

// Sort by call count descending
results.sort((a, b) => b.calls - a.calls);

// ── Bun.spawn full surface analysis ─────────────────────────────────
// Ref: https://bun.sh/docs/api/spawn
// Type ref: SpawnOptions.OptionsObject, Subprocess, SyncSubprocess

// All SpawnOptions.OptionsObject keys from Bun type definitions
const SPAWN_OPTION_KEYS = [
  "cwd", "env", "stdio", "stdin", "stdout", "stderr",
  "onExit", "ipc", "serialization",
  "windowsHide", "windowsVerbatimArguments", "argv0",
  "signal", "timeout", "killSignal", "maxBuffer", "terminal",
] as const;
type SpawnOptionKey = (typeof SPAWN_OPTION_KEYS)[number];

// All Subprocess instance members from Bun type definitions
const SUBPROCESS_MEMBERS = [
  // properties
  "pid", "exited", "exitCode", "signalCode", "killed", "stdin", "stdout", "stderr", "readable", "terminal",
  // methods
  "kill", "ref", "unref", "send", "disconnect", "resourceUsage",
] as const;
type SubprocessMember = (typeof SUBPROCESS_MEMBERS)[number];

// SyncSubprocess members
const SYNC_SUBPROCESS_MEMBERS = [
  "stdout", "stderr", "exitCode", "success", "resourceUsage", "signalCode", "exitedDueToTimeout", "pid",
] as const;

interface SpawnSite {
  line: number;
  cmd: string;
  sync: boolean;
  options: Partial<Record<SpawnOptionKey, string>>;
  subprocessAccess: Partial<Record<SubprocessMember, number[]>>;
}

function analyzeSpawnSites() {
  const sites: SpawnSite[] = [];
  const optionUsage: Record<string, number> = {};
  const memberUsage: Record<string, number> = {};
  const spawnRe = /Bun\.spawn(Sync)?\s*\(/g;

  for (let i = 0; i < lines.length; i++) {
    spawnRe.lastIndex = 0;
    const spawnMatch = spawnRe.exec(lines[i]);
    if (!spawnMatch) continue;

    const isSync = !!spawnMatch[1];

    // Gather context: spawn call + surrounding lines for options and subprocess access
    const optContext = lines.slice(i, Math.min(i + 10, lines.length)).join("\n");
    // Look ahead further for subprocess member access (proc.exited, proc.kill, etc.)
    const accessContext = lines.slice(i, Math.min(i + 20, lines.length)).join("\n");

    // Extract command array
    const cmdMatch = optContext.match(/Bun\.spawn(?:Sync)?\s*\(\s*\[([^\]]*)\]/);
    const cmd = cmdMatch ? cmdMatch[1].replace(/"/g, "").replace(/,\s*/g, " ").trim() : "dynamic";

    // Detect spawn options (key: value and shorthand method syntax)
    const opts: Partial<Record<SpawnOptionKey, string>> = {};
    for (const key of SPAWN_OPTION_KEYS) {
      const kvRe = new RegExp(`\\b${key}\\s*:\\s*([^,}\\n]+)`);
      const methodRe = new RegExp(`\\b${key}\\s*\\([^)]*\\)\\s*\\{`);
      const kvMatch = optContext.match(kvRe);
      const methodMatch = optContext.match(methodRe);
      if (kvMatch) {
        opts[key] = kvMatch[1].trim().replace(/,\s*$/, "");
        optionUsage[key] = (optionUsage[key] ?? 0) + 1;
      } else if (methodMatch) {
        opts[key] = "function";
        optionUsage[key] = (optionUsage[key] ?? 0) + 1;
      }
    }

    // Detect subprocess member access (proc.exited, proc.kill(), proc.pid, etc.)
    const members = isSync ? SYNC_SUBPROCESS_MEMBERS : SUBPROCESS_MEMBERS;
    const subprocessAccess: Partial<Record<SubprocessMember, number[]>> = {};
    // Find the variable name assigned to the spawn result
    const varMatch = lines[i].match(/(?:const|let|var)\s+(\w+)\s*=/);
    if (varMatch) {
      const varName = varMatch[1];
      for (const member of members) {
        const memberLines: number[] = [];
        // Search from spawn line forward for varName.member access
        for (let j = i; j < Math.min(i + 30, lines.length); j++) {
          const memberRe = new RegExp(`\\b${varName}\\.${member}\\b`);
          if (memberRe.test(lines[j])) {
            memberLines.push(j + 1);
          }
        }
        if (memberLines.length > 0) {
          subprocessAccess[member as SubprocessMember] = memberLines;
          memberUsage[member] = (memberUsage[member] ?? 0) + memberLines.length;
        }
      }
    }

    sites.push({ line: i + 1, cmd, sync: isSync, options: opts, subprocessAccess });
  }

  // Build full surface coverage
  const optionCoverage: Record<string, { used: boolean; sites: number }> = {};
  for (const key of SPAWN_OPTION_KEYS) {
    optionCoverage[key] = { used: (optionUsage[key] ?? 0) > 0, sites: optionUsage[key] ?? 0 };
  }
  const memberCoverage: Record<string, { used: boolean; sites: number }> = {};
  for (const member of SUBPROCESS_MEMBERS) {
    memberCoverage[member] = { used: (memberUsage[member] ?? 0) > 0, sites: memberUsage[member] ?? 0 };
  }

  return {
    sites,
    optionUsage,
    memberUsage,
    optionCoverage,
    memberCoverage,
    totals: {
      spawn_sites: sites.filter((s) => !s.sync).length,
      spawnSync_sites: sites.filter((s) => s.sync).length,
      options_used: Object.keys(optionUsage).length,
      options_available: SPAWN_OPTION_KEYS.length,
      members_used: Object.keys(memberUsage).length,
      members_available: SUBPROCESS_MEMBERS.length,
    },
  };
}

const spawnAnalysis = analyzeSpawnSites();

// ── Legacy pattern detection ────────────────────────────────────────

function countPattern(re: RegExp): number {
  let count = 0;
  for (const line of lines) {
    re.lastIndex = 0;
    if (re.test(line)) count++;
  }
  return count;
}

const legacyPatterns = {
  "new Response(proc.*)": countPattern(/new Response\(proc\./g),
  "URL(...).pathname (file)": countPattern(/new URL\([^)]*import\.meta\.url\)\.pathname/g),
  "manual stripAnsi regex": countPattern(/\.replace\(\/\\x1b\\\[/g),
};

// ── Runtime surface ─────────────────────────────────────────────────

const availableApis = Object.keys(Bun).filter((k) => !k.startsWith("_")).sort();
const usedApiNames = results.map((r) => r.api.replace(/^(Bun\.|import\.meta\.|proc\.)/, "").replace(/\.\*$/, "").split(".")[0]);
const unusedApis = availableApis.filter((k) => !usedApiNames.includes(k));

// ── Unicode summary ─────────────────────────────────────────────────

const unicodeCounts = {
  full: results.filter((r) => r.unicode === "full").length,
  passthrough: results.filter((r) => r.unicode === "passthrough").length,
  binary: results.filter((r) => r.unicode === "binary").length,
  "n/a": results.filter((r) => r.unicode === "n/a").length,
};

// ── Output ──────────────────────────────────────────────────────────

const totalCalls = results.reduce((sum, r) => sum + r.calls, 0);

const snapshot = {
  generated: new Date().toISOString(),
  file: "scan.ts",
  fileSizeBytes: new TextEncoder().encode(source).byteLength,
  fileLines: lines.length,
  runtime: {
    name: "bun",
    version: Bun.version,
    revision: Bun.revision,
    platform: `${process.platform} ${process.arch}`,
    available_apis: availableApis.length,
    used_apis: results.length,
    coverage: `${((results.length / availableApis.length) * 100).toFixed(1)}%`,
  },
  apis: results,
  spawn: {
    doc: "https://bun.sh/docs/api/spawn",
    type_ref: "https://bun.sh/docs/runtime/child-process#reference",
    totals: spawnAnalysis.totals,
    option_coverage: spawnAnalysis.optionCoverage,
    member_coverage: spawnAnalysis.memberCoverage,
    sites: spawnAnalysis.sites,
  },
  summary: {
    unique_apis: results.length,
    total_call_sites: totalCalls,
    unicode: unicodeCounts,
    min_bun_version: "1.0.0",
    legacy_patterns: legacyPatterns,
  },
  unused_bun_apis: unusedApis,
};

console.log(JSON.stringify(snapshot, null, 2));
