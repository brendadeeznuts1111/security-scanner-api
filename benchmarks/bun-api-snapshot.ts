/**
 * Bun API Snapshot Generator
 *
 * Dynamically scans scan.ts and cross-references every Bun native API call
 * against the running Bun runtime surface, documentation URLs, and unicode status.
 *
 * Run: bun run benchmarks/bun-api-snapshot.ts
 *
 * Writes to bun-api-snapshot.json automatically and prints to stdout.
 * Delta tracking compares against the previous bun-api-snapshot.json on each run.
 */

const SCAN_PATH = `${import.meta.dir}/../scan.ts`;
const SNAPSHOT_PATH = `${import.meta.dir}/bun-api-snapshot.json`;
const source = await Bun.file(SCAN_PATH).text();
const lines = source.split("\n");

// ── Load previous snapshot as baseline for delta tracking ────────────

type PreviousSnapshot = Record<string, unknown> & { metrics?: Record<string, number> };
let previousSnapshot: PreviousSnapshot | null = null;
const snapshotFile = Bun.file(SNAPSHOT_PATH);
if (await snapshotFile.exists()) {
  try {
    previousSnapshot = await snapshotFile.json() as PreviousSnapshot;
  } catch {
    previousSnapshot = null;
  }
}

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

// ── Signal analysis ─────────────────────────────────────────────────
// Ref: https://bun.sh/docs/runtime/child-process#reference (Signal type)
// Tracks all POSIX/platform signals and where they appear in the codebase.

const SIGNALS = [
  "SIGABRT", "SIGALRM", "SIGBUS", "SIGCHLD", "SIGCONT",
  "SIGFPE", "SIGHUP", "SIGILL", "SIGINT", "SIGIO",
  "SIGIOT", "SIGKILL", "SIGPIPE", "SIGPOLL", "SIGPROF",
  "SIGPWR", "SIGQUIT", "SIGSEGV", "SIGSTKFLT", "SIGSTOP",
  "SIGSYS", "SIGTERM", "SIGTRAP", "SIGTSTP", "SIGTTIN",
  "SIGTTOU", "SIGUNUSED", "SIGURG", "SIGUSR1", "SIGUSR2",
  "SIGVTALRM", "SIGWINCH", "SIGXCPU", "SIGXFSZ",
  "SIGBREAK", "SIGLOST", "SIGINFO",
] as const;

type SignalContext = "process.on" | "process.off" | "process.removeListener" | "proc.kill" | "spawn.killSignal" | "spawn.signal" | "other";

interface SignalSite {
  signal: string;
  line: number;
  context: SignalContext;
}

function analyzeSignals() {
  const sites: SignalSite[] = [];
  const signalUsage: Record<string, number> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const sig of SIGNALS) {
      if (!line.includes(sig)) continue;

      // Determine context
      let context: SignalContext = "other";
      if (/process\.on\s*\(/.test(line)) context = "process.on";
      else if (/process\.off\s*\(/.test(line)) context = "process.off";
      else if (/process\.removeListener\s*\(/.test(line)) context = "process.removeListener";
      else if (/\.kill\s*\(/.test(line)) context = "proc.kill";
      else if (/killSignal\s*:/.test(line)) context = "spawn.killSignal";
      else if (/\bsignal\s*:/.test(line)) context = "spawn.signal";

      sites.push({ signal: sig, line: i + 1, context });
      signalUsage[sig] = (signalUsage[sig] ?? 0) + 1;
    }
  }

  const coverage: Record<string, { used: boolean; sites: number }> = {};
  for (const sig of SIGNALS) {
    coverage[sig] = { used: (signalUsage[sig] ?? 0) > 0, sites: signalUsage[sig] ?? 0 };
  }

  const contexts: Record<string, number> = {};
  for (const site of sites) {
    contexts[site.context] = (contexts[site.context] ?? 0) + 1;
  }

  return {
    total_signals_available: SIGNALS.length,
    total_signals_used: Object.keys(signalUsage).length,
    contexts,
    coverage,
    sites,
  };
}

const signalAnalysis = analyzeSignals();

// ── Terminal (PTY) analysis ──────────────────────────────────────────
// Ref: https://bun.sh/docs/api/spawn#terminal
// Type ref: TerminalOptions, Terminal
// Bun.spawn({ terminal: true }) gives a PTY-backed subprocess.
// Terminal is accessed via proc.terminal.

// TerminalOptions keys (passed in spawn options when terminal: true/TerminalOptions)
const TERMINAL_OPTIONS_KEYS = [
  "cols", "rows", "name",
  // callbacks
  "data", "exit", "drain",
] as const;

// Terminal instance members (from proc.terminal)
const TERMINAL_MEMBERS = [
  // methods
  "write", "resize", "setRawMode", "ref", "unref", "close",
] as const;

function analyzeTerminal() {
  const optionSites: { key: string; line: number }[] = [];
  const memberSites: { member: string; line: number }[] = [];
  const optionUsage: Record<string, number> = {};
  const memberUsage: Record<string, number> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for terminal option usage in spawn calls (terminal: true/TerminalOptions)
    for (const key of TERMINAL_OPTIONS_KEYS) {
      // Match as spawn option in a terminal options object
      const re = new RegExp(`\\b${key}\\s*:`);
      // Only match within terminal-related context
      if (re.test(line) && (line.includes("terminal") || line.includes("pty") || line.includes("PTY"))) {
        optionSites.push({ key, line: i + 1 });
        optionUsage[key] = (optionUsage[key] ?? 0) + 1;
      }
    }

    // Check for Terminal member access (proc.terminal.write, etc.)
    for (const member of TERMINAL_MEMBERS) {
      const re = new RegExp(`\\.terminal\\.${member}\\b`);
      if (re.test(line)) {
        memberSites.push({ member, line: i + 1 });
        memberUsage[member] = (memberUsage[member] ?? 0) + 1;
      }
    }
  }

  const optionCoverage: Record<string, { used: boolean; sites: number }> = {};
  for (const key of TERMINAL_OPTIONS_KEYS) {
    optionCoverage[key] = { used: (optionUsage[key] ?? 0) > 0, sites: optionUsage[key] ?? 0 };
  }
  const memberCoverage: Record<string, { used: boolean; sites: number }> = {};
  for (const member of TERMINAL_MEMBERS) {
    memberCoverage[member] = { used: (memberUsage[member] ?? 0) > 0, sites: memberUsage[member] ?? 0 };
  }

  return {
    options_used: Object.keys(optionUsage).length,
    options_available: TERMINAL_OPTIONS_KEYS.length,
    members_used: Object.keys(memberUsage).length,
    members_available: TERMINAL_MEMBERS.length,
    option_coverage: optionCoverage,
    member_coverage: memberCoverage,
    option_sites: optionSites,
    member_sites: memberSites,
  };
}

const terminalAnalysis = analyzeTerminal();

// ── ResourceUsage analysis ───────────────────────────────────────────
// Ref: https://bun.sh/docs/api/spawn#resourceusage
// Accessed via proc.resourceUsage() (Subprocess) or result.resourceUsage (SyncSubprocess)
// Returns detailed OS-level resource consumption metrics.

const RESOURCE_USAGE_FIELDS = [
  "contextSwitches", "cpuTime", "maxRSS", "messages",
  "ops", "shmSize", "signalCount", "swapCount",
] as const;

// Sub-fields of cpuTime
const CPU_TIME_FIELDS = ["user", "system", "total"] as const;
// Sub-fields of contextSwitches
const CONTEXT_SWITCH_FIELDS = ["voluntary", "involuntary"] as const;
// Sub-fields of messages
const MESSAGES_FIELDS = ["sent", "received"] as const;
// Sub-fields of ops
const OPS_FIELDS = ["in", "out"] as const;

function analyzeResourceUsage() {
  const sites: { field: string; line: number }[] = [];
  const fieldUsage: Record<string, number> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for resourceUsage() call
    if (/\.resourceUsage\b/.test(line)) {
      sites.push({ field: "resourceUsage", line: i + 1 });
      fieldUsage["resourceUsage"] = (fieldUsage["resourceUsage"] ?? 0) + 1;
    }

    // Check for individual field access
    for (const field of RESOURCE_USAGE_FIELDS) {
      const re = new RegExp(`resourceUsage[^.]*\\.${field}\\b`);
      if (re.test(line)) {
        sites.push({ field, line: i + 1 });
        fieldUsage[field] = (fieldUsage[field] ?? 0) + 1;
      }
    }
  }

  const fieldCoverage: Record<string, { used: boolean; sites: number }> = {};
  for (const field of RESOURCE_USAGE_FIELDS) {
    fieldCoverage[field] = { used: (fieldUsage[field] ?? 0) > 0, sites: fieldUsage[field] ?? 0 };
  }

  return {
    call_sites: fieldUsage["resourceUsage"] ?? 0,
    fields_used: Object.keys(fieldUsage).filter((k) => k !== "resourceUsage").length,
    fields_available: RESOURCE_USAGE_FIELDS.length,
    field_coverage: fieldCoverage,
    sub_fields: {
      cpuTime: CPU_TIME_FIELDS.slice(),
      contextSwitches: CONTEXT_SWITCH_FIELDS.slice(),
      messages: MESSAGES_FIELDS.slice(),
      ops: OPS_FIELDS.slice(),
    },
    sites,
  };
}

const resourceUsageAnalysis = analyzeResourceUsage();

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

// ── Metrics: flat table of every tracked number ─────────────────────
// Every numeric metric in one place — the base for delta tracking.

const totalCalls = results.reduce((sum, r) => sum + r.calls, 0);

const unicodeCounts = {
  full: results.filter((r) => r.unicode === "full").length,
  passthrough: results.filter((r) => r.unicode === "passthrough").length,
  binary: results.filter((r) => r.unicode === "binary").length,
  "n/a": results.filter((r) => r.unicode === "n/a").length,
};

const metrics: Record<string, number> = {
  // file
  "file.size_bytes":         new TextEncoder().encode(source).byteLength,
  "file.lines":              lines.length,

  // runtime surface
  "runtime.available_apis":  availableApis.length,
  "runtime.used_apis":       results.length,

  // api call sites
  "apis.unique":             results.length,
  "apis.total_call_sites":   totalCalls,

  // unicode breakdown
  "unicode.full":            unicodeCounts.full,
  "unicode.passthrough":     unicodeCounts.passthrough,
  "unicode.binary":          unicodeCounts.binary,
  "unicode.n_a":             unicodeCounts["n/a"],

  // legacy patterns (should stay at 0)
  "legacy.response_wrapper": countPattern(/new Response\(proc\./g),
  "legacy.url_pathname":     countPattern(/new URL\([^)]*import\.meta\.url\)\.pathname/g),
  "legacy.strip_ansi_regex": countPattern(/\.replace\(\/\\x1b\\\[/g),

  // spawn surface
  "spawn.sites_async":       spawnAnalysis.totals.spawn_sites,
  "spawn.sites_sync":        spawnAnalysis.totals.spawnSync_sites,
  "spawn.sites_total":       spawnAnalysis.totals.spawn_sites + spawnAnalysis.totals.spawnSync_sites,
  "spawn.options_available": SPAWN_OPTION_KEYS.length,
  "spawn.options_used":      spawnAnalysis.totals.options_used,
  "spawn.members_available": SUBPROCESS_MEMBERS.length,
  "spawn.members_used":      spawnAnalysis.totals.members_used,
  "spawn.sync_members_available": SYNC_SUBPROCESS_MEMBERS.length,

  // signals
  "signals.available":       SIGNALS.length,
  "signals.used":            signalAnalysis.total_signals_used,
  "signals.sites":           signalAnalysis.sites.length,

  // terminal (PTY)
  "terminal.options_available": TERMINAL_OPTIONS_KEYS.length,
  "terminal.options_used":      terminalAnalysis.options_used,
  "terminal.members_available": TERMINAL_MEMBERS.length,
  "terminal.members_used":      terminalAnalysis.members_used,

  // resource usage
  "resource_usage.call_sites":    resourceUsageAnalysis.call_sites,
  "resource_usage.fields_available": RESOURCE_USAGE_FIELDS.length,
  "resource_usage.fields_used":     resourceUsageAnalysis.fields_used,

  // per-signal context counts
  ...Object.fromEntries(
    Object.entries(signalAnalysis.contexts).map(([ctx, n]) => [`signals.ctx.${ctx}`, n])
  ),

  // per-api call counts
  ...Object.fromEntries(results.map((r) => [`api.${r.api}.calls`, r.calls])),
};

// ── Delta: compare against previous snapshot ────────────────────────

interface DeltaEntry {
  metric: string;
  previous: number;
  current: number;
  delta: number;
  changed: boolean;
}

function computeDelta(current: Record<string, number>, previous: Record<string, number> | null): DeltaEntry[] {
  if (!previous) return [];

  const allKeys = new Set([...Object.keys(current), ...Object.keys(previous)]);
  const entries: DeltaEntry[] = [];

  for (const key of [...allKeys].sort()) {
    const cur = current[key] ?? 0;
    const prev = previous[key] ?? 0;
    entries.push({
      metric: key,
      previous: prev,
      current: cur,
      delta: cur - prev,
      changed: cur !== prev,
    });
  }

  return entries;
}

const previousMetrics: Record<string, number> | null = previousSnapshot?.metrics ?? null;
const deltaEntries = computeDelta(metrics, previousMetrics);
const changedEntries = deltaEntries.filter((e) => e.changed);

// ── Coverage percentages ────────────────────────────────────────────

function pct(used: number, available: number): string {
  return available > 0 ? `${((used / available) * 100).toFixed(1)}%` : "n/a";
}

const coverage = {
  runtime_apis:       pct(results.length, availableApis.length),
  spawn_options:      pct(spawnAnalysis.totals.options_used, SPAWN_OPTION_KEYS.length),
  spawn_members:      pct(spawnAnalysis.totals.members_used, SUBPROCESS_MEMBERS.length),
  signals:            pct(signalAnalysis.total_signals_used, SIGNALS.length),
  terminal_options:   pct(terminalAnalysis.options_used, TERMINAL_OPTIONS_KEYS.length),
  terminal_members:   pct(terminalAnalysis.members_used, TERMINAL_MEMBERS.length),
  resource_usage:     pct(resourceUsageAnalysis.fields_used, RESOURCE_USAGE_FIELDS.length),
};

// ── Output ──────────────────────────────────────────────────────────

const snapshot = {
  generated: new Date().toISOString(),
  previous_generated: previousSnapshot?.generated ?? null,
  file: "scan.ts",
  runtime: {
    name: "bun",
    version: Bun.version,
    revision: Bun.revision,
    platform: `${process.platform} ${process.arch}`,
  },
  metrics,
  delta: {
    has_baseline: previousMetrics !== null,
    total_metrics: deltaEntries.length,
    changed_count: changedEntries.length,
    unchanged_count: deltaEntries.length - changedEntries.length,
    changes: changedEntries,
  },
  coverage,
  summary: {
    surface_table: [
      { surface: "Bun Runtime APIs",   used: results.length,                    available: availableApis.length,            coverage: coverage.runtime_apis },
      { surface: "API Call Sites",      used: totalCalls,                        available: null,                            coverage: null },
      { surface: "Spawn Options",       used: spawnAnalysis.totals.options_used, available: SPAWN_OPTION_KEYS.length,        coverage: coverage.spawn_options },
      { surface: "Subprocess Members",  used: spawnAnalysis.totals.members_used, available: SUBPROCESS_MEMBERS.length,       coverage: coverage.spawn_members },
      { surface: "Spawn Sites (async)", used: spawnAnalysis.totals.spawn_sites,  available: null,                            coverage: null },
      { surface: "Spawn Sites (sync)",  used: spawnAnalysis.totals.spawnSync_sites, available: null,                         coverage: null },
      { surface: "Signals",             used: signalAnalysis.total_signals_used, available: SIGNALS.length,                  coverage: coverage.signals },
      { surface: "Signal Sites",        used: signalAnalysis.sites.length,       available: null,                            coverage: null },
      { surface: "Terminal Options",    used: terminalAnalysis.options_used,      available: TERMINAL_OPTIONS_KEYS.length,    coverage: coverage.terminal_options },
      { surface: "Terminal Members",    used: terminalAnalysis.members_used,      available: TERMINAL_MEMBERS.length,         coverage: coverage.terminal_members },
      { surface: "ResourceUsage Calls", used: resourceUsageAnalysis.call_sites,  available: null,                            coverage: null },
      { surface: "ResourceUsage Fields",used: resourceUsageAnalysis.fields_used, available: RESOURCE_USAGE_FIELDS.length,    coverage: coverage.resource_usage },
      { surface: "Unicode: full",       used: unicodeCounts.full,                available: null,                            coverage: null },
      { surface: "Unicode: passthrough",used: unicodeCounts.passthrough,         available: null,                            coverage: null },
      { surface: "Unicode: binary",     used: unicodeCounts.binary,              available: null,                            coverage: null },
      { surface: "Unicode: n/a",        used: unicodeCounts["n/a"],              available: null,                            coverage: null },
      { surface: "Legacy Patterns",     used: metrics["legacy.response_wrapper"] + metrics["legacy.url_pathname"] + metrics["legacy.strip_ansi_regex"], available: null, coverage: null },
    ],
    min_bun_version: "1.0.0",
    file_size_bytes: metrics["file.size_bytes"],
    file_lines: metrics["file.lines"],
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
  signals: {
    doc: "https://bun.sh/docs/runtime/child-process#reference",
    total_available: signalAnalysis.total_signals_available,
    total_used: signalAnalysis.total_signals_used,
    contexts: signalAnalysis.contexts,
    coverage: signalAnalysis.coverage,
    sites: signalAnalysis.sites,
  },
  terminal: {
    doc: "https://bun.sh/docs/api/spawn#terminal",
    type_ref: "TerminalOptions, Terminal",
    options_available: terminalAnalysis.options_available,
    options_used: terminalAnalysis.options_used,
    members_available: terminalAnalysis.members_available,
    members_used: terminalAnalysis.members_used,
    option_coverage: terminalAnalysis.option_coverage,
    member_coverage: terminalAnalysis.member_coverage,
    option_sites: terminalAnalysis.option_sites,
    member_sites: terminalAnalysis.member_sites,
  },
  resource_usage: {
    doc: "https://bun.sh/docs/api/spawn#resourceusage",
    type_ref: "ResourceUsage",
    call_sites: resourceUsageAnalysis.call_sites,
    fields_available: resourceUsageAnalysis.fields_available,
    fields_used: resourceUsageAnalysis.fields_used,
    field_coverage: resourceUsageAnalysis.field_coverage,
    sub_fields: resourceUsageAnalysis.sub_fields,
    sites: resourceUsageAnalysis.sites,
  },
  unused_bun_apis: unusedApis,
};

const output = JSON.stringify(snapshot, null, 2);
await Bun.write(SNAPSHOT_PATH, output + "\n");
console.log(output);
