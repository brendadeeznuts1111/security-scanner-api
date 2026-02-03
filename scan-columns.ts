// scan-columns.ts — Scanner Column Schema

export const SCANNER_COLUMNS = {
  // Main Project Table
  PROJECT_SCAN: [
    { key: "idx", header: "#", width: 4, default: 0 },
    { key: "folder", header: "Project", width: 28, default: "unknown" },
    { key: "name", header: "Package Name", width: 34, default: "unknown" },
    { key: "version", header: "Version", width: 12, default: "0.0.0" },
    { key: "configVersion", header: "Ver", width: 4, default: 0 },
    { key: "bunVersion", header: "Bun", width: 10, default: ">=1.3.8" },
    { key: "lockfile", header: "Lock", width: 10, default: "bun.lock" },
    { key: "registry", header: "Registry", width: 24, default: "npm" },
    { key: "workspaces", header: "Workspaces", width: 20, default: "-" },
    { key: "hasTests", header: "Tests", width: 6, default: "-" },
    { key: "workspace", header: "WS", width: 4, default: "no" },
    { key: "linker", header: "Linker", width: 20, default: "hoisted" },
    { key: "trustedDeps", header: "Trusted", width: 10, default: "-" },
    { key: "nativeDeps", header: "Native", width: 10, default: "-" },
    { key: "scripts", header: "Scripts", width: 20, default: "-" },
    { key: "envVars", header: "Env Vars", width: 20, default: "-" },
  ] as const,

  // Delta/XRef Summary (Footer)
  DELTA_FOOTER: [
    { key: "snapshotDate", header: "Snapshot", width: 12, default: "" },
    { key: "projectsDelta", header: "Projects Δ", width: 10, default: "0" },
    { key: "trustedDelta", header: "Trusted Δ", width: 10, default: "0" },
    { key: "nativeDelta", header: "Native Δ", width: 10, default: "0" },
    { key: "linkerChanges", header: "Linker Δ", width: 10, default: "0" },
    { key: "driftStatus", header: "Drift", width: 10, default: "none" },
  ] as const,

  // Audit Trail (JSONL)
  AUDIT_LOG: [
    { key: "timestamp", header: "Timestamp", width: 24, default: () => new Date().toISOString() },
    { key: "scanDuration", header: "Duration(ms)", width: 12, default: 0 },
    { key: "projectsScanned", header: "Projects", width: 8, default: 0 },
    { key: "projectsChanged", header: "Changed", width: 8, default: 0 },
    { key: "snapshotHash", header: "Hash", width: 16, default: "" },
    { key: "driftDetected", header: "Drift", width: 8, default: false },
    { key: "user", header: "User", width: 16, default: () => Bun.env.USER || "unknown" },
    { key: "cwd", header: "CWD", width: 40, default: () => import.meta.dir },
  ] as const,
} as const;
