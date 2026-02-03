/**
 * Team Member Profile Init
 *
 * Auto-detects machine info and writes a member profile to .benchrc.json
 * for benchmark reproducibility. Preserves existing team member entries.
 *
 * Usage:
 *   bun run benchmarks/team-init.ts --name "Nola Rose" --notes "M3 Max, plugged in"
 *   bun run benchmarks/team-init.ts                    # uses defaults or existing values
 *
 * The .benchrc.json file is shared across the team (committed to git).
 */

import * as os from "os";

const BENCHRC_PATH = `${import.meta.dir}/../.benchrc.json`;

// ── Parse CLI args ──────────────────────────────────────────────────

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--") && i + 1 < argv.length) {
      args[arg.slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

const cliArgs = parseArgs(Bun.argv.slice(2));

// ── Auto-detect machine info ────────────────────────────────────────

const cpus = os.cpus();
const detected = {
  os: process.platform,
  arch: process.arch,
  cpu: cpus[0]?.model ?? "unknown",
  cores: cpus.length,
  memory_gb: Math.round(os.totalmem() / (1024 ** 3)),
  bun_version: Bun.version,
};

const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const username = Bun.env.USER ?? "unknown";

// ── Load existing .benchrc.json ─────────────────────────────────────

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
  timezone: string;
  notes: string;
  machine: MachineInfo;
}

interface BenchRC {
  team: Record<string, MemberProfile>;
}

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

// ── Merge profile ───────────────────────────────────────────────────

const existing = benchrc.team[username];

const profile: MemberProfile = {
  name: cliArgs.name ?? existing?.name ?? username,
  timezone: detectedTimezone,
  notes: cliArgs.notes ?? existing?.notes ?? "",
  machine: detected,
};

benchrc.team[username] = profile;

// ── Write .benchrc.json ─────────────────────────────────────────────

await Bun.write(BENCHRC_PATH, JSON.stringify(benchrc, null, 2) + "\n");

// ── Print result ────────────────────────────────────────────────────

console.log(`Profile written to .benchrc.json\n`);
console.log(`  User:     ${username}`);
console.log(`  Name:     ${profile.name}`);
console.log(`  Timezone: ${profile.timezone}`);
console.log(`  Notes:    ${profile.notes || "(none)"}`);
console.log(`  Machine:  ${profile.machine.cpu}, ${profile.machine.cores} cores, ${profile.machine.memory_gb} GB`);
console.log(`  OS:       ${profile.machine.os} ${profile.machine.arch}`);
console.log(`  Bun:      ${profile.machine.bun_version}`);
