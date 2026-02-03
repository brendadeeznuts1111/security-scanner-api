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

// ── API categorization ──────────────────────────────────────────────
// Groups all available Bun runtime APIs into functional categories.

const API_CATEGORY_RULES: [string, RegExp][] = [
  ["HTTP & Networking",  /^(serve|fetch|connect|listen|dns|udpSocket|Socket|TCPSocket|TLSSocket|Listener)/],
  ["Shell & Process",    /^(spawn|spawnSync|\$|which|argv|env|sleep)/],
  ["File I/O",           /^(file|write|read|stdin|stdout|stderr|openFile|mmap|indexOfLine|BunFile)/],
  ["Build & Bundling",   /^(build|Transpiler|plugin|resolve)/],
  ["Hashing & Security", /^(hash|CryptoHasher|SHA|MD[45]|password|TOTP|Crypto)/],
  ["Databases",          /^(sql|SQL|S3Client|s3|redis|Redis)/],
  ["Compression",        /^(gzip|deflate|inflate|gunzip|brotli|zlib)/],
  ["Streaming",          /^(ArrayBufferSink|readableStreamTo|concatArrayBuffers)/],
  ["Routing",            /^(FileSystemRouter|Router)/],
  ["Advanced",           /^(gc|generateHeapSnapshot|shrink|jsc|allocUnsafe|unsafe|peek)/],
  ["Semver",             /^(semver)/],
  ["Configuration",      /^(version|revision|main|origin|cwd|assetPrefix|enableANSIColors)/],
];

function categorizeApi(name: string): string {
  for (const [category, re] of API_CATEGORY_RULES) {
    if (re.test(name)) return category;
  }
  return "Utilities";
}

function buildApiCategories() {
  const cats: Record<string, { used: string[]; unused: string[]; available: number; used_count: number; coverage: string }> = {};

  for (const api of availableApis) {
    const cat = categorizeApi(api);
    if (!cats[cat]) cats[cat] = { used: [], unused: [], available: 0, used_count: 0, coverage: "0.0%" };
    cats[cat].available++;
    if (usedApiNames.includes(api)) {
      cats[cat].used.push(api);
      cats[cat].used_count++;
    } else {
      cats[cat].unused.push(api);
    }
  }

  for (const c of Object.values(cats)) {
    c.coverage = c.available > 0 ? `${((c.used_count / c.available) * 100).toFixed(1)}%` : "n/a";
  }
  return cats;
}

const apiCategories = buildApiCategories();

// ── Signal categorization ───────────────────────────────────────────

const SIGNAL_CATEGORY_DEFS: Record<string, string[]> = {
  "Error signals":       ["SIGABRT", "SIGBUS", "SIGFPE", "SIGILL", "SIGSEGV"],
  "Termination signals": ["SIGTERM", "SIGKILL", "SIGHUP", "SIGQUIT", "SIGINT"],
  "User signals":        ["SIGUSR1", "SIGUSR2"],
  "Child signals":       ["SIGCHLD"],
  "Input signals":       ["SIGTTIN", "SIGTTOU"],
  "Operation signals":   ["SIGPIPE", "SIGALRM", "SIGPROF", "SIGVTALRM", "SIGIO", "SIGPOLL"],
  "Job control":         ["SIGSTOP", "SIGTSTP", "SIGCONT", "SIGURG"],
  "Misc":                ["SIGTRAP", "SIGSYS", "SIGXCPU", "SIGXFSZ", "SIGWINCH", "SIGPWR", "SIGSTKFLT", "SIGIOT", "SIGUNUSED", "SIGBREAK", "SIGLOST", "SIGINFO"],
};

function buildSignalCategories() {
  const cats: Record<string, { used: number; available: number; coverage: string; used_signals: string[] }> = {};
  for (const [cat, sigs] of Object.entries(SIGNAL_CATEGORY_DEFS)) {
    const usedSigs = sigs.filter((s) => signalAnalysis.coverage[s]?.used);
    cats[cat] = {
      used: usedSigs.length,
      available: sigs.length,
      coverage: sigs.length > 0 ? `${((usedSigs.length / sigs.length) * 100).toFixed(1)}%` : "n/a",
      used_signals: usedSigs,
    };
  }
  return cats;
}

const signalCategories = buildSignalCategories();

// ── Subprocess per-site member coverage ─────────────────────────────

const SUBPROCESS_MEMBER_TYPES: Record<string, string> = {
  pid: "number", exited: "Promise<number>", exitCode: "number", signalCode: "NodeJS.Signals",
  killed: "boolean", stdin: "FileSink", stdout: "ReadableStream", stderr: "ReadableStream",
  readable: "ReadableStream", terminal: "Terminal", kill: "method", ref: "method",
  unref: "method", send: "method", disconnect: "method", resourceUsage: "method",
};

function buildSubprocessPerSite() {
  const asyncSites = spawnAnalysis.sites.filter((s) => !s.sync);
  const total = asyncSites.length;
  const perMember: Record<string, { type: string; used: boolean; sites_using: number; total_sites: number; ratio: string }> = {};

  for (const member of SUBPROCESS_MEMBERS) {
    const sitesUsing = asyncSites.filter((s) => member in s.subprocessAccess).length;
    perMember[member] = {
      type: SUBPROCESS_MEMBER_TYPES[member] ?? "unknown",
      used: sitesUsing > 0,
      sites_using: sitesUsing,
      total_sites: total,
      ratio: `${sitesUsing}/${total}`,
    };
  }
  return perMember;
}

const subprocessPerSite = buildSubprocessPerSite();

// ── Unicode summary ─────────────────────────────────────────────────

const unicodeCounts = {
  full: results.filter((r) => r.unicode === "full").length,
  passthrough: results.filter((r) => r.unicode === "passthrough").length,
  binary: results.filter((r) => r.unicode === "binary").length,
  "n/a": results.filter((r) => r.unicode === "n/a").length,
};
const unicodeHandled = unicodeCounts.full + unicodeCounts.passthrough + unicodeCounts.binary;

// ── Helpers ─────────────────────────────────────────────────────────

function pct(used: number, available: number): string {
  return available > 0 ? `${((used / available) * 100).toFixed(1)}%` : "n/a";
}

function pctNum(used: number, available: number): number {
  return available > 0 ? (used / available) * 100 : 0;
}

function bar(ratio: number, width = 18): string {
  const filled = Math.round(ratio * width);
  return "\u2588".repeat(filled) + "\u00b7".repeat(width - filled);
}

function heatLabel(p: number): string {
  if (p === 0) return "None";
  if (p < 10) return "Very Low";
  if (p < 30) return "Low";
  if (p < 60) return "Medium";
  if (p < 80) return "High";
  return "Very High";
}

// ── Metrics: flat table of every tracked number ─────────────────────

const totalCalls = results.reduce((sum, r) => sum + r.calls, 0);

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
  "unicode.handled_total":   unicodeHandled,

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
  "resource_usage.call_sites":       resourceUsageAnalysis.call_sites,
  "resource_usage.fields_available": RESOURCE_USAGE_FIELDS.length,
  "resource_usage.fields_used":      resourceUsageAnalysis.fields_used,

  // per-signal context counts
  ...Object.fromEntries(
    Object.entries(signalAnalysis.contexts).map(([ctx, n]) => [`signals.ctx.${ctx}`, n]),
  ),

  // per-api call counts
  ...Object.fromEntries(results.map((r) => [`api.${r.api}.calls`, r.calls])),

  // per-category counts
  ...Object.fromEntries(
    Object.entries(apiCategories).map(([cat, d]) => [`category.${cat}.used`, d.used_count]),
  ),
  ...Object.fromEntries(
    Object.entries(apiCategories).map(([cat, d]) => [`category.${cat}.available`, d.available]),
  ),

  // per-signal-category counts
  ...Object.fromEntries(
    Object.entries(signalCategories).map(([cat, d]) => [`signal_cat.${cat}.used`, d.used]),
  ),
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
    entries.push({ metric: key, previous: prev, current: cur, delta: cur - prev, changed: cur !== prev });
  }
  return entries;
}

const previousMetrics: Record<string, number> | null = previousSnapshot?.metrics ?? null;
const deltaEntries = computeDelta(metrics, previousMetrics);
const changedEntries = deltaEntries.filter((e) => e.changed);

// ── Coverage ────────────────────────────────────────────────────────

const coverage = {
  runtime_apis:   pct(results.length, availableApis.length),
  spawn_options:  pct(spawnAnalysis.totals.options_used, SPAWN_OPTION_KEYS.length),
  spawn_members:  pct(spawnAnalysis.totals.members_used, SUBPROCESS_MEMBERS.length),
  signals:        pct(signalAnalysis.total_signals_used, SIGNALS.length),
  terminal_options: pct(terminalAnalysis.options_used, TERMINAL_OPTIONS_KEYS.length),
  terminal_members: pct(terminalAnalysis.members_used, TERMINAL_MEMBERS.length),
  resource_usage: pct(resourceUsageAnalysis.fields_used, RESOURCE_USAGE_FIELDS.length),
  unicode:        pct(unicodeHandled, results.length),
};

// ── Heatmap data ────────────────────────────────────────────────────

const heatmap = [
  { surface: "Runtime APIs",     pct: pctNum(results.length, availableApis.length) },
  { surface: "Spawn Options",    pct: pctNum(spawnAnalysis.totals.options_used, SPAWN_OPTION_KEYS.length) },
  { surface: "Subprocess Props", pct: pctNum(spawnAnalysis.totals.members_used, SUBPROCESS_MEMBERS.length) },
  { surface: "Signals",          pct: pctNum(signalAnalysis.total_signals_used, SIGNALS.length) },
  { surface: "Terminal",         pct: pctNum(terminalAnalysis.options_used + terminalAnalysis.members_used, TERMINAL_OPTIONS_KEYS.length + TERMINAL_MEMBERS.length) },
  { surface: "ResourceUsage",    pct: pctNum(resourceUsageAnalysis.fields_used, RESOURCE_USAGE_FIELDS.length) },
  { surface: "Unicode",          pct: pctNum(unicodeHandled, results.length) },
];

// ── Spawn option matrix ─────────────────────────────────────────────

const spawnOptionMatrix = SPAWN_OPTION_KEYS.map((key) => ({
  option: key,
  status: spawnAnalysis.optionCoverage[key]?.used ? "Used" : "Unused",
  sites: spawnAnalysis.optionCoverage[key]?.sites ?? 0,
}));

// ── Output JSON ─────────────────────────────────────────────────────

const processUsed = spawnAnalysis.totals.options_used + spawnAnalysis.totals.members_used;
const processAvail = SPAWN_OPTION_KEYS.length + SUBPROCESS_MEMBERS.length;

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
  heatmap,
  summary: {
    surface_table: [
      { surface: "Bun Runtime APIs",    used: results.length,                       available: availableApis.length,         coverage: coverage.runtime_apis },
      { surface: "API Call Sites",       used: totalCalls,                           available: null,                         coverage: null },
      { surface: "Spawn Options",        used: spawnAnalysis.totals.options_used,    available: SPAWN_OPTION_KEYS.length,     coverage: coverage.spawn_options },
      { surface: "Subprocess Members",   used: spawnAnalysis.totals.members_used,    available: SUBPROCESS_MEMBERS.length,    coverage: coverage.spawn_members },
      { surface: "Spawn Sites (async)",  used: spawnAnalysis.totals.spawn_sites,     available: null,                         coverage: null },
      { surface: "Spawn Sites (sync)",   used: spawnAnalysis.totals.spawnSync_sites, available: null,                         coverage: null },
      { surface: "Signals",              used: signalAnalysis.total_signals_used,    available: SIGNALS.length,               coverage: coverage.signals },
      { surface: "Signal Sites",         used: signalAnalysis.sites.length,          available: null,                         coverage: null },
      { surface: "Terminal Options",     used: terminalAnalysis.options_used,         available: TERMINAL_OPTIONS_KEYS.length, coverage: coverage.terminal_options },
      { surface: "Terminal Members",     used: terminalAnalysis.members_used,         available: TERMINAL_MEMBERS.length,      coverage: coverage.terminal_members },
      { surface: "ResourceUsage Calls",  used: resourceUsageAnalysis.call_sites,     available: null,                         coverage: null },
      { surface: "ResourceUsage Fields", used: resourceUsageAnalysis.fields_used,    available: RESOURCE_USAGE_FIELDS.length, coverage: coverage.resource_usage },
      { surface: "Unicode: full",        used: unicodeCounts.full,                   available: null,                         coverage: null },
      { surface: "Unicode: passthrough", used: unicodeCounts.passthrough,            available: null,                         coverage: null },
      { surface: "Unicode: binary",      used: unicodeCounts.binary,                 available: null,                         coverage: null },
      { surface: "Unicode: n/a",         used: unicodeCounts["n/a"],                 available: null,                         coverage: null },
      { surface: "Legacy Patterns",      used: metrics["legacy.response_wrapper"] + metrics["legacy.url_pathname"] + metrics["legacy.strip_ansi_regex"], available: null, coverage: null },
    ],
    min_bun_version: "1.0.0",
    file_size_bytes: metrics["file.size_bytes"],
    file_lines: metrics["file.lines"],
  },
  api_categories: apiCategories,
  signal_categories: signalCategories,
  subprocess_per_site: subprocessPerSite,
  spawn_option_matrix: spawnOptionMatrix,
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

// ── Write JSON ──────────────────────────────────────────────────────

await Bun.write(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + "\n");

// ── Dashboard ───────────────────────────────────────────────────────

const W = 79;
const hline = "\u2500".repeat(W - 2);
const dline = "\u2550".repeat(W - 2);
const thinline = "\u2500".repeat(W - 4);

const pad = (s: string, n: number) => s.length >= n ? s.slice(0, n) : s + " ".repeat(n - s.length);
const rpad = (s: string, n: number) => s.length >= n ? s.slice(0, n) : " ".repeat(n - s.length) + s;

console.log(`\u2554${dline}\u2557`);
console.log(`\u2551${pad(`  BUN API METRICS DASHBOARD \u2014 ${Object.keys(metrics).length} METRICS`, W - 2)}\u2551`);
console.log(`\u255a${dline}\u255d`);
console.log();

// ── Section: Runtime API Coverage ──────────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad(`  RUNTIME API COVERAGE (${results.length}/${availableApis.length} used \u2014 ${coverage.runtime_apis})`, W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
console.log(`\u2502  ${pad("Surface", 26)}${rpad("Used", 6)}${rpad("Avail", 8)}${rpad("Coverage", 10)}${" ".repeat(W - 2 - 2 - 26 - 6 - 8 - 10)}\u2502`);
console.log(`\u2502  ${thinline}  \u2502`);

for (const [cat, d] of Object.entries(apiCategories).sort((a, b) => b[1].available - a[1].available)) {
  console.log(`\u2502  ${pad(cat, 26)}${rpad(String(d.used_count), 6)}${rpad(String(d.available), 8)}${rpad(d.coverage, 10)}${" ".repeat(W - 2 - 2 - 26 - 6 - 8 - 10)}\u2502`);
}
console.log(`\u2502  ${thinline}  \u2502`);
console.log(`\u2502  ${pad("TOTAL", 26)}${rpad(String(results.length), 6)}${rpad(String(availableApis.length), 8)}${rpad(coverage.runtime_apis, 10)}${" ".repeat(W - 2 - 2 - 26 - 6 - 8 - 10)}\u2502`);
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Process & Spawn Coverage ──────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad(`  PROCESS & SPAWN COVERAGE (${processUsed}/${processAvail} used \u2014 ${pct(processUsed, processAvail)})`, W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
console.log(`\u2502  ${pad("Surface", 26)}${rpad("Used", 6)}${rpad("Avail", 8)}${rpad("Coverage", 10)}${" ".repeat(W - 2 - 2 - 26 - 6 - 8 - 10)}\u2502`);
console.log(`\u2502  ${thinline}  \u2502`);

const processRows = [
  ["Spawn Options",       spawnAnalysis.totals.options_used,      SPAWN_OPTION_KEYS.length,        coverage.spawn_options],
  ["Subprocess Members",  spawnAnalysis.totals.members_used,      SUBPROCESS_MEMBERS.length,       coverage.spawn_members],
  ["Spawn Sites (async)", spawnAnalysis.totals.spawn_sites,       null,                            null],
  ["Spawn Sites (sync)",  spawnAnalysis.totals.spawnSync_sites,   null,                            null],
  ["Signals",             signalAnalysis.total_signals_used,      SIGNALS.length,                  coverage.signals],
  ["Signal Sites",        signalAnalysis.sites.length,            null,                            null],
  ["Terminal Options",    terminalAnalysis.options_used,           TERMINAL_OPTIONS_KEYS.length,    coverage.terminal_options],
  ["Terminal Members",    terminalAnalysis.members_used,           TERMINAL_MEMBERS.length,         coverage.terminal_members],
  ["ResourceUsage Calls", resourceUsageAnalysis.call_sites,       null,                            null],
  ["ResourceUsage Fields", resourceUsageAnalysis.fields_used,     RESOURCE_USAGE_FIELDS.length,    coverage.resource_usage],
] as const;

for (const [name, used, avail, cov] of processRows) {
  console.log(`\u2502  ${pad(name, 26)}${rpad(String(used), 6)}${rpad(avail !== null ? String(avail) : "-", 8)}${rpad(cov ?? "-", 10)}${" ".repeat(W - 2 - 2 - 26 - 6 - 8 - 10)}\u2502`);
}
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Spawn Configuration Matrix ────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad("  SPAWN CONFIGURATION MATRIX", W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
console.log(`\u2502  ${pad("Option", 32)}${rpad("Status", 10)}${rpad("Sites", 8)}${" ".repeat(W - 2 - 2 - 32 - 10 - 8)}\u2502`);
console.log(`\u2502  ${thinline}  \u2502`);
for (const row of spawnOptionMatrix) {
  console.log(`\u2502  ${pad(row.option, 32)}${rpad(row.status, 10)}${rpad(String(row.sites), 8)}${" ".repeat(W - 2 - 2 - 32 - 10 - 8)}\u2502`);
}
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Subprocess Interface ──────────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad("  SUBPROCESS INTERFACE", W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
console.log(`\u2502  ${pad("Member", 20)}${pad("Type", 20)}${rpad("Used", 6)}${rpad("Sites", 10)}${" ".repeat(W - 2 - 2 - 20 - 20 - 6 - 10)}\u2502`);
console.log(`\u2502  ${thinline}  \u2502`);
for (const [member, d] of Object.entries(subprocessPerSite)) {
  const mark = d.used ? "\u2713" : "\u2717";
  console.log(`\u2502  ${pad(member, 20)}${pad(d.type, 20)}${rpad(mark, 6)}${rpad(d.ratio, 10)}${" ".repeat(W - 2 - 2 - 20 - 20 - 6 - 10)}\u2502`);
}
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Signal Coverage ───────────────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad("  SIGNAL COVERAGE", W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
console.log(`\u2502  ${pad("Category", 24)}${rpad("Used", 6)}${rpad("Avail", 8)}${rpad("Coverage", 10)}${" ".repeat(W - 2 - 2 - 24 - 6 - 8 - 10)}\u2502`);
console.log(`\u2502  ${thinline}  \u2502`);
for (const [cat, d] of Object.entries(signalCategories)) {
  console.log(`\u2502  ${pad(cat, 24)}${rpad(String(d.used), 6)}${rpad(String(d.available), 8)}${rpad(d.coverage, 10)}${" ".repeat(W - 2 - 2 - 24 - 6 - 8 - 10)}\u2502`);
}
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Unicode Handling ──────────────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad(`  UNICODE HANDLING (${unicodeHandled}/${results.length} patterns \u2014 ${coverage.unicode})`, W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
const unicodeRows = [
  ["full",        unicodeCounts.full,        "Full Unicode support"],
  ["passthrough", unicodeCounts.passthrough,  "Pass-through to native"],
  ["binary",      unicodeCounts.binary,       "Binary-safe operations"],
  ["n/a",         unicodeCounts["n/a"],       "Not applicable"],
] as const;
for (const [cat, count, desc] of unicodeRows) {
  console.log(`\u2502  ${pad(`Unicode: ${cat}`, 26)}${rpad(String(count), 6)}  ${pad(desc, W - 2 - 2 - 26 - 6 - 2)}\u2502`);
}
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Legacy ────────────────────────────────
const legacyTotal = metrics["legacy.response_wrapper"] + metrics["legacy.url_pathname"] + metrics["legacy.strip_ansi_regex"];
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad("  LEGACY & DEPRECATION", W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
console.log(`\u2502  ${pad("Legacy Patterns", 26)}${rpad(String(legacyTotal), 6)}  ${pad(legacyTotal === 0 ? "No legacy patterns detected" : "LEGACY PATTERNS FOUND", W - 2 - 2 - 26 - 6 - 2)}\u2502`);
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Coverage Heatmap ──────────────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad("  COVERAGE HEATMAP", W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
for (const h of heatmap) {
  const b = bar(h.pct / 100);
  const p = `${h.pct.toFixed(1)}%`;
  const label = heatLabel(h.pct);
  console.log(`\u2502  ${pad(h.surface, 20)}[${b}] ${rpad(p, 6)}  ${pad(label, W - 2 - 2 - 20 - 1 - 18 - 2 - 6 - 2)}\u2502`);
}
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Delta Detection ───────────────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad("  DELTA DETECTION", W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
if (!previousMetrics) {
  console.log(`\u2502  ${pad("No baseline \u2014 first run. Re-run to track changes.", W - 4)}  \u2502`);
} else if (changedEntries.length === 0) {
  console.log(`\u2502  ${pad(`${deltaEntries.length} metrics tracked \u2014 0 changes since last run.`, W - 4)}  \u2502`);
} else {
  console.log(`\u2502  ${pad("Metric", 36)}${rpad("Prev", 8)}${rpad("Curr", 8)}${rpad("Delta", 10)}${" ".repeat(W - 2 - 2 - 36 - 8 - 8 - 10)}\u2502`);
  console.log(`\u2502  ${thinline}  \u2502`);
  for (const c of changedEntries.slice(0, 20)) {
    const sign = c.delta > 0 ? "+" : "";
    console.log(`\u2502  ${pad(c.metric, 36)}${rpad(String(c.previous), 8)}${rpad(String(c.current), 8)}${rpad(`${sign}${c.delta}`, 10)}${" ".repeat(W - 2 - 2 - 36 - 8 - 8 - 10)}\u2502`);
  }
  if (changedEntries.length > 20) {
    console.log(`\u2502  ${pad(`... and ${changedEntries.length - 20} more`, W - 4)}  \u2502`);
  }
}
console.log(`\u2514${hline}\u2518`);
console.log();

// ── Section: Summary ───────────────────────────────
console.log(`\u250c${hline}\u2510`);
console.log(`\u2502${pad("  METRICS SUMMARY", W - 2)}\u2502`);
console.log(`\u251c${hline}\u2524`);
const summaryRows = [
  [`Total Metrics Tracked`,     String(Object.keys(metrics).length)],
  [`Runtime APIs Used`,         `${results.length} / ${availableApis.length}   (${coverage.runtime_apis})`],
  [`Process Options Used`,      `${spawnAnalysis.totals.options_used} / ${SPAWN_OPTION_KEYS.length}     (${coverage.spawn_options})`],
  [`Subprocess Members Used`,   `${spawnAnalysis.totals.members_used} / ${SUBPROCESS_MEMBERS.length}     (${coverage.spawn_members})`],
  [`Signals Used`,              `${signalAnalysis.total_signals_used} / ${SIGNALS.length}     (${coverage.signals})`],
  [`Terminal Options Used`,     `${terminalAnalysis.options_used} / ${TERMINAL_OPTIONS_KEYS.length}      (${coverage.terminal_options})`],
  [`ResourceUsage Fields Used`, `${resourceUsageAnalysis.fields_used} / ${RESOURCE_USAGE_FIELDS.length}      (${coverage.resource_usage})`],
  [`Unicode Patterns`,          `${unicodeHandled} / ${results.length}     (${coverage.unicode})`],
  [`Legacy Patterns`,           String(legacyTotal)],
  [`File`,                      `${lines.length} lines \u00b7 ${(metrics["file.size_bytes"] / 1024).toFixed(1)} KB`],
  [`Bun`,                       `${Bun.version} \u00b7 ${process.platform} ${process.arch}`],
];
for (const [label, value] of summaryRows) {
  console.log(`\u2502  ${pad(label, 30)}${pad(value, W - 2 - 2 - 30)}\u2502`);
}
console.log(`\u2514${hline}\u2518`);
console.log();

console.log(`JSON written to ${SNAPSHOT_PATH}`);
