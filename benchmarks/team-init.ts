/**
 * Team Member Profile Init
 *
 * Auto-detects machine info and writes a member profile to .benchrc.json
 * for benchmark reproducibility. Preserves existing team member entries.
 *
 * Usage:
 *   bun run benchmarks/team-init.ts --name "Nola Rose" --email "nola@example.com" --notes "M3 Max, plugged in"
 *   bun run benchmarks/team-init.ts                    # uses defaults or existing values
 *   bun run benchmarks/team-init.ts --check            # validate all profiles in .benchrc.json
 *
 * The .benchrc.json file is shared across the team (committed to git).
 */

import * as os from "os";

const BENCHRC_PATH = `${import.meta.dir}/../.benchrc.json`;

// ── ANSI helpers ────────────────────────────────────────────────────

const useColor = Bun.enableANSIColors && !!process.stdout.isTTY;
const B = useColor ? "\x1b[1m" : "";
const D = useColor ? "\x1b[2m" : "";
const R = useColor ? "\x1b[0m" : "";
const cRed = useColor ? "\x1b[31m" : "";
const cGreen = useColor ? "\x1b[32m" : "";
const cYellow = useColor ? "\x1b[33m" : "";
const cCyan = useColor ? "\x1b[36m" : "";

// ── Parse CLI args ──────────────────────────────────────────────────

function parseCliArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--check") {
      args.check = "true";
    } else if (arg.startsWith("--") && i + 1 < argv.length) {
      args[arg.slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

const cliArgs = parseCliArgs(Bun.argv.slice(2));

// ── Types ───────────────────────────────────────────────────────────

interface MachineInfo {
  os: string;
  arch: string;
  cpu: string;
  cores: number;
  memory_gb: number;
  bun_version: string;
}

interface MemberProfile {
  name: string;
  email?: string;
  timezone: string;
  notes: string;
  machine: MachineInfo;
}

interface BenchRC {
  team: Record<string, MemberProfile>;
}

// ── Validation ──────────────────────────────────────────────────────

type Severity = "error" | "warn";
interface Issue { field: string; message: string; severity: Severity; value?: string }

const VALID_OS = new Set(["darwin", "linux", "win32", "freebsd", "openbsd", "sunos", "aix"]);
const VALID_ARCH = new Set(["arm64", "x64", "arm", "ia32", "ppc64", "s390x", "riscv64"]);

function validateName(name: string): Issue[] {
  const issues: Issue[] = [];
  if (!name || name.trim().length === 0) {
    issues.push({ field: "name", message: "name is empty", severity: "error" });
    return issues;
  }
  if (name !== name.trim()) {
    issues.push({ field: "name", message: "name has leading/trailing whitespace", severity: "error", value: JSON.stringify(name) });
  }
  if (name.length < 2) {
    issues.push({ field: "name", message: "name is too short (< 2 chars)", severity: "warn", value: name });
  }
  if (name.length > 64) {
    issues.push({ field: "name", message: "name is too long (> 64 chars)", severity: "warn", value: `${name.length} chars` });
  }
  if (/\d/.test(name)) {
    issues.push({ field: "name", message: "name contains digits", severity: "warn", value: name });
  }
  // Check capitalization: each word should start with uppercase
  const words = name.split(/\s+/);
  for (const word of words) {
    if (word.length > 0 && word[0] !== word[0].toUpperCase()) {
      issues.push({ field: "name", message: `word "${word}" not capitalized`, severity: "warn", value: name });
      break;
    }
  }
  // Check for suspicious patterns
  if (/[<>{}[\]|\\^~`]/.test(name)) {
    issues.push({ field: "name", message: "name contains unusual characters", severity: "warn", value: name });
  }
  return issues;
}

function validateEmail(email: string | undefined): Issue[] {
  const issues: Issue[] = [];
  if (email === undefined || email === "") return issues; // optional field
  if (email !== email.trim()) {
    issues.push({ field: "email", message: "email has leading/trailing whitespace", severity: "error", value: JSON.stringify(email) });
  }
  // RFC 5322 simplified: local@domain.tld
  const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRe.test(email)) {
    issues.push({ field: "email", message: "email format is invalid", severity: "error", value: email });
    return issues;
  }
  const domain = email.split("@")[1];
  if (!domain.includes(".")) {
    issues.push({ field: "email", message: "email domain has no TLD", severity: "error", value: email });
  }
  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2) {
    issues.push({ field: "email", message: "email TLD is too short", severity: "warn", value: email });
  }
  // Common typos
  const typoMap: Record<string, string> = {
    "gmial.com": "gmail.com", "gamil.com": "gmail.com", "gmal.com": "gmail.com",
    "gmaill.com": "gmail.com", "gnail.com": "gmail.com",
    "outlok.com": "outlook.com", "outllook.com": "outlook.com",
    "yahooo.com": "yahoo.com", "yaho.com": "yahoo.com",
    "hotmal.com": "hotmail.com", "hotmial.com": "hotmail.com",
    "protonmal.com": "protonmail.com",
  };
  if (typoMap[domain]) {
    issues.push({ field: "email", message: `possible typo: "${domain}" → did you mean "${typoMap[domain]}"?`, severity: "warn", value: email });
  }
  return issues;
}

function validateTimezone(tz: string): Issue[] {
  const issues: Issue[] = [];
  if (!tz || tz.trim().length === 0) {
    issues.push({ field: "timezone", message: "timezone is empty", severity: "error" });
    return issues;
  }
  // IANA timezone: Region/City or Region/Sub/City
  if (!/^[A-Z][a-zA-Z0-9_]+\/[A-Za-z0-9_/+-]+$/.test(tz) && tz !== "UTC") {
    issues.push({ field: "timezone", message: "timezone is not IANA format (e.g. America/Chicago)", severity: "error", value: tz });
    return issues;
  }
  // Verify the runtime accepts it
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
  } catch {
    issues.push({ field: "timezone", message: "timezone is not recognized by the runtime", severity: "error", value: tz });
  }
  return issues;
}

function validateMachine(machine: unknown): Issue[] {
  const issues: Issue[] = [];
  if (!machine || typeof machine !== "object") {
    issues.push({ field: "machine", message: "machine is missing or not an object", severity: "error" });
    return issues;
  }
  const m = machine as Record<string, unknown>;

  // os
  if (typeof m.os !== "string") {
    issues.push({ field: "machine.os", message: "os is missing or not a string", severity: "error" });
  } else if (!VALID_OS.has(m.os)) {
    issues.push({ field: "machine.os", message: `unrecognized os value`, severity: "warn", value: m.os });
  }

  // arch
  if (typeof m.arch !== "string") {
    issues.push({ field: "machine.arch", message: "arch is missing or not a string", severity: "error" });
  } else if (!VALID_ARCH.has(m.arch)) {
    issues.push({ field: "machine.arch", message: `unrecognized arch value`, severity: "warn", value: m.arch });
  }

  // cpu
  if (typeof m.cpu !== "string") {
    issues.push({ field: "machine.cpu", message: "cpu is missing or not a string", severity: "error" });
  } else if (m.cpu.length < 3) {
    issues.push({ field: "machine.cpu", message: "cpu description too short", severity: "warn", value: m.cpu });
  }

  // cores
  if (typeof m.cores !== "number") {
    issues.push({ field: "machine.cores", message: "cores is missing or not a number", severity: "error" });
  } else if (!Number.isInteger(m.cores) || m.cores < 1) {
    issues.push({ field: "machine.cores", message: "cores must be a positive integer", severity: "error", value: String(m.cores) });
  } else if (m.cores > 256) {
    issues.push({ field: "machine.cores", message: "cores value seems unusually high", severity: "warn", value: String(m.cores) });
  }

  // memory_gb
  if (typeof m.memory_gb !== "number") {
    issues.push({ field: "machine.memory_gb", message: "memory_gb is missing or not a number", severity: "error" });
  } else if (m.memory_gb < 1) {
    issues.push({ field: "machine.memory_gb", message: "memory_gb must be >= 1", severity: "error", value: String(m.memory_gb) });
  } else if (m.memory_gb > 2048) {
    issues.push({ field: "machine.memory_gb", message: "memory_gb value seems unusually high", severity: "warn", value: String(m.memory_gb) });
  }

  // bun_version
  if (typeof m.bun_version !== "string") {
    issues.push({ field: "machine.bun_version", message: "bun_version is missing or not a string", severity: "error" });
  } else if (!/^\d+\.\d+\.\d+/.test(m.bun_version)) {
    issues.push({ field: "machine.bun_version", message: "bun_version doesn't look like semver", severity: "warn", value: m.bun_version });
  }

  return issues;
}

function validateUsername(key: string): Issue[] {
  const issues: Issue[] = [];
  if (!key || key.trim().length === 0) {
    issues.push({ field: "username (key)", message: "username key is empty", severity: "error" });
    return issues;
  }
  if (key !== key.toLowerCase()) {
    issues.push({ field: "username (key)", message: "username key should be lowercase", severity: "warn", value: key });
  }
  if (/\s/.test(key)) {
    issues.push({ field: "username (key)", message: "username key contains whitespace", severity: "error", value: JSON.stringify(key) });
  }
  if (key.length > 32) {
    issues.push({ field: "username (key)", message: "username key is too long (> 32 chars)", severity: "warn", value: `${key.length} chars` });
  }
  return issues;
}

function validateNotes(notes: string): Issue[] {
  const issues: Issue[] = [];
  if (typeof notes !== "string") {
    issues.push({ field: "notes", message: "notes is not a string", severity: "error" });
    return issues;
  }
  if (notes.length > 200) {
    issues.push({ field: "notes", message: "notes is very long (> 200 chars)", severity: "warn", value: `${notes.length} chars` });
  }
  return issues;
}

function validateProfile(key: string, profile: MemberProfile): Issue[] {
  return [
    ...validateUsername(key),
    ...validateName(profile.name),
    ...validateEmail(profile.email),
    ...validateTimezone(profile.timezone),
    ...validateNotes(profile.notes),
    ...validateMachine(profile.machine),
  ];
}

function printIssues(memberKey: string, issues: Issue[]): { errors: number; warnings: number } {
  let errors = 0;
  let warnings = 0;
  for (const issue of issues) {
    if (issue.severity === "error") {
      errors++;
      console.log(`    ${cRed}error${R}  ${issue.field}: ${issue.message}${issue.value ? ` ${D}[${issue.value}]${R}` : ""}`);
    } else {
      warnings++;
      console.log(`    ${cYellow}warn${R}   ${issue.field}: ${issue.message}${issue.value ? ` ${D}[${issue.value}]${R}` : ""}`);
    }
  }
  return { errors, warnings };
}

// ── Load existing .benchrc.json ─────────────────────────────────────

let benchrc: BenchRC = { team: {} };

const benchrcFile = Bun.file(BENCHRC_PATH);
if (await benchrcFile.exists()) {
  try {
    benchrc = (await benchrcFile.json()) as BenchRC;
    if (!benchrc.team) benchrc.team = {};
  } catch {
    benchrc = { team: {} };
  }
}

// ── Check mode ──────────────────────────────────────────────────────

if (cliArgs.check) {
  console.log(`${B}Validating .benchrc.json${R}\n`);

  const teamKeys = Object.keys(benchrc.team);
  if (teamKeys.length === 0) {
    console.log(`  ${cYellow}No team members found.${R}`);
    process.exit(0);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const key of teamKeys) {
    const profile = benchrc.team[key];
    const issues = validateProfile(key, profile);
    const icon = issues.some((i) => i.severity === "error") ? `${cRed}✗${R}` : issues.length > 0 ? `${cYellow}~${R}` : `${cGreen}✓${R}`;
    console.log(`  ${icon} ${B}${key}${R} ${D}(${profile.name})${R}`);

    if (issues.length === 0) {
      console.log(`    ${cGreen}all checks passed${R}`);
    } else {
      const { errors, warnings } = printIssues(key, issues);
      totalErrors += errors;
      totalWarnings += warnings;
    }
    console.log();
  }

  // Summary table
  const summaryRows = [
    { Field: "Members", Value: String(teamKeys.length) },
    { Field: "Errors", Value: totalErrors > 0 ? `${totalErrors}` : "0" },
    { Field: "Warnings", Value: totalWarnings > 0 ? `${totalWarnings}` : "0" },
    { Field: "Status", Value: totalErrors > 0 ? "FAIL" : totalWarnings > 0 ? "PASS (with warnings)" : "PASS" },
  ];
  // @ts-expect-error Bun.inspect.table accepts options as third arg
  console.log(Bun.inspect.table(summaryRows, ["Field", "Value"], { colors: useColor }));

  process.exit(totalErrors > 0 ? 1 : 0);
}

// ── Auto-detect machine info ────────────────────────────────────────

const cpus = os.cpus();
const detected: MachineInfo = {
  os: process.platform,
  arch: process.arch,
  cpu: cpus[0]?.model ?? "unknown",
  cores: cpus.length,
  memory_gb: Math.round(os.totalmem() / (1024 ** 3)),
  bun_version: Bun.version,
};

const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const username = Bun.env.USER ?? "unknown";

// ── Merge profile ───────────────────────────────────────────────────

const existing = benchrc.team[username];

const profile: MemberProfile = {
  name: cliArgs.name ?? existing?.name ?? username,
  ...(cliArgs.email || existing?.email ? { email: cliArgs.email ?? existing?.email } : {}),
  timezone: detectedTimezone,
  notes: cliArgs.notes ?? existing?.notes ?? "",
  machine: detected,
};

// ── Validate before writing ─────────────────────────────────────────

const issues = validateProfile(username, profile);
if (issues.length > 0) {
  console.log(`${B}Validation results:${R}\n`);
  const { errors, warnings } = printIssues(username, issues);
  console.log();
  if (errors > 0) {
    console.log(`  ${cRed}${errors} error(s) found. Fix before writing.${R}`);
    console.log(`  ${D}Use --name, --email, --notes to set values.${R}`);
    process.exit(1);
  }
  if (warnings > 0) {
    console.log(`  ${cYellow}${warnings} warning(s) — writing anyway.${R}\n`);
  }
}

benchrc.team[username] = profile;

// ── Write .benchrc.json ─────────────────────────────────────────────

await Bun.write(BENCHRC_PATH, JSON.stringify(benchrc, null, 2) + "\n");

// ── Print result ────────────────────────────────────────────────────

console.log(`Profile written to .benchrc.json\n`);

const resultRows = [
  { Field: "User", Value: username },
  { Field: "Name", Value: profile.name },
  ...(profile.email ? [{ Field: "Email", Value: profile.email }] : []),
  { Field: "Timezone", Value: profile.timezone },
  { Field: "Notes", Value: profile.notes || "(none)" },
  { Field: "CPU", Value: `${profile.machine.cpu}, ${profile.machine.cores} cores` },
  { Field: "Memory", Value: `${profile.machine.memory_gb} GB` },
  { Field: "OS", Value: `${profile.machine.os} ${profile.machine.arch}` },
  { Field: "Bun", Value: profile.machine.bun_version },
];

// @ts-expect-error Bun.inspect.table accepts options as third arg
console.log(Bun.inspect.table(resultRows, ["Field", "Value"], { colors: useColor }));
