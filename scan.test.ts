import { describe, test, expect } from "bun:test";
import { isFeatureFlagActive, classifyEnvFlag, effectiveLinker, platformHelp, shouldWarnMise, parseTzFromEnv, parseEnvVar } from "./scan.ts";

describe("isFeatureFlagActive", () => {
  test("returns true for '1'", () => {
    expect(isFeatureFlagActive("1")).toBe(true);
  });

  test("returns true for 'true'", () => {
    expect(isFeatureFlagActive("true")).toBe(true);
  });

  test("returns false for undefined", () => {
    expect(isFeatureFlagActive(undefined)).toBe(false);
  });

  test("returns false for '0'", () => {
    expect(isFeatureFlagActive("0")).toBe(false);
  });

  test("returns false for '2'", () => {
    expect(isFeatureFlagActive("2")).toBe(false);
  });

  test("returns false for empty string", () => {
    expect(isFeatureFlagActive("")).toBe(false);
  });

  test("returns false for 'false'", () => {
    expect(isFeatureFlagActive("false")).toBe(false);
  });

  test("returns false for 'yes'", () => {
    expect(isFeatureFlagActive("yes")).toBe(false);
  });

  test("returns false for 'TRUE' (case-sensitive)", () => {
    expect(isFeatureFlagActive("TRUE")).toBe(false);
  });
});

describe("classifyEnvFlag", () => {
  const OFF_LABEL = "BLOCKED";

  test("not set → inactive with offLabel", () => {
    const result = classifyEnvFlag(undefined, OFF_LABEL);
    expect(result).toEqual({ label: "BLOCKED", state: "inactive" });
  });

  test("'1' → active OFF", () => {
    const result = classifyEnvFlag("1", OFF_LABEL);
    expect(result).toEqual({ label: "OFF", state: "active" });
  });

  test("'true' → active OFF", () => {
    const result = classifyEnvFlag("true", OFF_LABEL);
    expect(result).toEqual({ label: "OFF", state: "active" });
  });

  test("'0' → ambiguous with raw value", () => {
    const result = classifyEnvFlag("0", OFF_LABEL);
    expect(result).toEqual({ label: "set (0)", state: "ambiguous" });
  });

  test("'2' → ambiguous with raw value", () => {
    const result = classifyEnvFlag("2", OFF_LABEL);
    expect(result).toEqual({ label: "set (2)", state: "ambiguous" });
  });

  test("empty string → inactive (falsy)", () => {
    const result = classifyEnvFlag("", OFF_LABEL);
    expect(result).toEqual({ label: "BLOCKED", state: "inactive" });
  });

  test("'false' → ambiguous", () => {
    const result = classifyEnvFlag("false", OFF_LABEL);
    expect(result).toEqual({ label: "set (false)", state: "ambiguous" });
  });

  test("works with ON offLabel", () => {
    expect(classifyEnvFlag(undefined, "ON")).toEqual({ label: "ON", state: "inactive" });
    expect(classifyEnvFlag("1", "ON")).toEqual({ label: "OFF", state: "active" });
    expect(classifyEnvFlag("0", "ON")).toEqual({ label: "set (0)", state: "ambiguous" });
  });
});

describe("effectiveLinker", () => {
  const base = { linker: "-", configVersion: -1, workspace: false };

  test("explicit bunfig linker wins", () => {
    expect(effectiveLinker({ ...base, linker: "isolated" }))
      .toEqual({ strategy: "isolated", source: "bunfig" });
    expect(effectiveLinker({ ...base, linker: "hoisted", configVersion: 1, workspace: true }))
      .toEqual({ strategy: "hoisted", source: "bunfig" });
  });

  test("configVersion=0 → hoisted (compat)", () => {
    expect(effectiveLinker({ ...base, configVersion: 0 }))
      .toEqual({ strategy: "hoisted", source: "configVersion=0 (compat)" });
  });

  test("configVersion=0 + workspace → still hoisted", () => {
    expect(effectiveLinker({ ...base, configVersion: 0, workspace: true }))
      .toEqual({ strategy: "hoisted", source: "configVersion=0 (compat)" });
  });

  test("configVersion=1 non-workspace → hoisted", () => {
    expect(effectiveLinker({ ...base, configVersion: 1 }))
      .toEqual({ strategy: "hoisted", source: "configVersion=1" });
  });

  test("configVersion=1 + workspace → isolated", () => {
    expect(effectiveLinker({ ...base, configVersion: 1, workspace: true }))
      .toEqual({ strategy: "isolated", source: "configVersion=1 + workspace" });
  });

  test("no lockfile (configVersion=-1) → hoisted default", () => {
    expect(effectiveLinker(base))
      .toEqual({ strategy: "hoisted", source: "default" });
  });
});

describe("platformHelp", () => {
  test("win32 → mise.exe cmd with hint", () => {
    const result = platformHelp("win32");
    expect(result.cmd).toBe("mise.exe exec -- bun");
    expect(result.hint).toBeString();
    expect(result.hint).toContain("mise.exe");
  });

  test("darwin → bun cmd, no hint", () => {
    const result = platformHelp("darwin");
    expect(result.cmd).toBe("bun");
    expect(result.hint).toBeNull();
  });

  test("linux → bun cmd, no hint", () => {
    const result = platformHelp("linux");
    expect(result.cmd).toBe("bun");
    expect(result.hint).toBeNull();
  });
});

describe("shouldWarnMise", () => {
  test("win32 without MISE_SHELL → true", () => {
    expect(shouldWarnMise("win32", undefined)).toBe(true);
  });

  test("win32 with empty MISE_SHELL → true", () => {
    expect(shouldWarnMise("win32", "")).toBe(true);
  });

  test("win32 with MISE_SHELL set → false", () => {
    expect(shouldWarnMise("win32", "pwsh")).toBe(false);
  });

  test("darwin without MISE_SHELL → false", () => {
    expect(shouldWarnMise("darwin", undefined)).toBe(false);
  });

  test("linux with MISE_SHELL → false", () => {
    expect(shouldWarnMise("linux", "bash")).toBe(false);
  });
});

describe("parseTzFromEnv", () => {
  test("no files → default", () => {
    expect(parseTzFromEnv([])).toBe("-");
  });

  test("no TZ line → default", () => {
    expect(parseTzFromEnv(["FOO=bar\nBAZ=1"])).toBe("-");
  });

  test("simple TZ=", () => {
    expect(parseTzFromEnv(["TZ=America/Chicago"])).toBe("America/Chicago");
  });

  test("TZ with quotes", () => {
    expect(parseTzFromEnv(['TZ="Asia/Tokyo"'])).toBe("Asia/Tokyo");
    expect(parseTzFromEnv(["TZ='Europe/London'"])).toBe("Europe/London");
  });

  test("TZ with surrounding vars", () => {
    expect(parseTzFromEnv(["NODE_ENV=production\nTZ=UTC\nPORT=3000"])).toBe("UTC");
  });

  test("TZ with spaces around =", () => {
    expect(parseTzFromEnv(["TZ = America/New_York"])).toBe("America/New_York");
  });

  test("TZ with inline comment", () => {
    expect(parseTzFromEnv(["TZ=Pacific/Auckland # NZ time"])).toBe("Pacific/Auckland");
  });

  test("last file wins (Bun load order)", () => {
    expect(parseTzFromEnv([
      "TZ=America/Chicago",
      "FOO=bar",
      "TZ=Asia/Tokyo",
    ])).toBe("Asia/Tokyo");
  });

  test("later file overrides earlier", () => {
    expect(parseTzFromEnv([
      "TZ=UTC",
      "TZ=America/New_York",
    ])).toBe("America/New_York");
  });

  test("file without TZ does not reset", () => {
    expect(parseTzFromEnv([
      "TZ=Europe/Berlin",
      "NODE_ENV=test",
    ])).toBe("Europe/Berlin");
  });

  test("getHours respects process.env.TZ", () => {
    const before = process.env.TZ;
    process.env.TZ = "UTC";
    const utcHour = new Date("2026-02-03T12:00:00Z").getHours();
    process.env.TZ = "Asia/Tokyo";
    const tokyoHour = new Date("2026-02-03T12:00:00Z").getHours();
    process.env.TZ = before;
    expect(utcHour).toBe(12);
    expect(tokyoHour).toBe(21);
  });

  test("dev in Chicago and junior dev in Tokyo see same UTC timestamp", () => {
    const before = process.env.TZ;
    const ts = "2026-06-15T18:30:00Z";

    // Senior dev in Chicago (UTC-5 CDT)
    process.env.TZ = "America/Chicago";
    const chicagoLocal = new Date(ts).getHours();
    const chicagoIso = new Date(ts).toISOString();

    // Junior dev in Tokyo (UTC+9)
    process.env.TZ = "Asia/Tokyo";
    const tokyoLocal = new Date(ts).getHours();
    const tokyoIso = new Date(ts).toISOString();

    process.env.TZ = before;

    // Local hours differ
    expect(chicagoLocal).toBe(13);  // 1:30 PM CDT
    expect(tokyoLocal).toBe(3);     // 3:30 AM +1 day JST

    // UTC timestamp is identical — scanner snapshots use ISO for comparison
    expect(chicagoIso).toBe(tokyoIso);
    expect(chicagoIso).toBe("2026-06-15T18:30:00.000Z");
  });

  test("project .env TZ is independent of developer's local TZ", () => {
    const before = process.env.TZ;
    const envFiles = ["TZ=Europe/Berlin"];

    // Dev in Chicago parses the same project
    process.env.TZ = "America/Chicago";
    const fromChicago = parseTzFromEnv(envFiles);

    // Dev in Tokyo parses the same project
    process.env.TZ = "Asia/Tokyo";
    const fromTokyo = parseTzFromEnv(envFiles);

    process.env.TZ = before;

    // Both devs see the project's configured TZ, not their own
    expect(fromChicago).toBe("Europe/Berlin");
    expect(fromTokyo).toBe("Europe/Berlin");
  });

  test("scanner local date differs per developer TZ for same instant", () => {
    const before = process.env.TZ;
    const ts = "2026-02-03T04:00:00Z"; // 4 AM UTC

    // Dev in Chicago: Feb 2, 10 PM
    process.env.TZ = "America/Chicago";
    const chicagoDate = new Date(ts).getDate();
    const chicagoHour = new Date(ts).getHours();

    // Dev in Tokyo: Feb 3, 1 PM
    process.env.TZ = "Asia/Tokyo";
    const tokyoDate = new Date(ts).getDate();
    const tokyoHour = new Date(ts).getHours();

    process.env.TZ = before;

    // Different local date — this is why snapshot stores both ISO and local
    expect(chicagoDate).toBe(2);
    expect(chicagoHour).toBe(22);
    expect(tokyoDate).toBe(3);
    expect(tokyoHour).toBe(13);
  });
});

describe("parseEnvVar", () => {
  test("returns default for empty input", () => {
    expect(parseEnvVar([], "FOO")).toBe("-");
  });

  test("returns default when key not found", () => {
    expect(parseEnvVar(["BAR=1\nBAZ=2"], "FOO")).toBe("-");
  });

  test("extracts BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS", () => {
    expect(parseEnvVar(["BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5"], "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS")).toBe("5");
  });

  test("extracts quoted values", () => {
    expect(parseEnvVar(['BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS="10"'], "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS")).toBe("10");
  });

  test("last file wins", () => {
    expect(parseEnvVar([
      "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5",
      "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=15",
    ], "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS")).toBe("15");
  });

  test("file without key does not reset", () => {
    expect(parseEnvVar([
      "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5",
      "NODE_ENV=production",
    ], "BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS")).toBe("5");
  });

  test("handles DO_NOT_TRACK", () => {
    expect(parseEnvVar(["DO_NOT_TRACK=1"], "DO_NOT_TRACK")).toBe("1");
  });

  test("parseTzFromEnv delegates to parseEnvVar", () => {
    expect(parseTzFromEnv(["TZ=America/Chicago"])).toBe("America/Chicago");
    expect(parseEnvVar(["TZ=America/Chicago"], "TZ")).toBe("America/Chicago");
  });
});

describe("timezone subprocess (real TZ from command line)", () => {
  const scanTs = `${import.meta.dir}/scan.ts`;

  test("--tz flag sets timezone in output", async () => {
    const proc = Bun.spawn(["bun", "run", scanTs, "--tz=Asia/Tokyo"], {
      stdout: "pipe", stderr: "pipe",
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;
    expect(out).toContain("Asia/Tokyo");
    expect(out).toContain("(TZ=Asia/Tokyo)");
  });

  test("TZ env var sets timezone in output", async () => {
    const proc = Bun.spawn(["bun", "run", scanTs], {
      stdout: "pipe", stderr: "pipe",
      env: { ...process.env, TZ: "America/New_York" },
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;
    expect(out).toContain("America/New_York");
    expect(out).toContain("(TZ=America/New_York)");
  });

  test("Chicago dev and Tokyo dev get same project count", async () => {
    const run = (tz: string) => {
      const proc = Bun.spawn(["bun", "run", scanTs, "--json"], {
        stdout: "pipe", stderr: "pipe",
        env: { ...process.env, TZ: tz },
      });
      return new Response(proc.stdout).text();
    };
    const [chicagoOut, tokyoOut] = await Promise.all([
      run("America/Chicago"),
      run("Asia/Tokyo"),
    ]);
    const chicagoProjects = JSON.parse(chicagoOut);
    const tokyoProjects = JSON.parse(tokyoOut);
    expect(chicagoProjects.length).toBe(tokyoProjects.length);
    expect(chicagoProjects.length).toBeGreaterThan(0);
  });

  test("snapshot from Chicago dev is readable by Tokyo dev", async () => {
    const snapshotPath = `${import.meta.dir}/.audit/xref-snapshot.json`;
    // Chicago dev saves snapshot
    const save = Bun.spawn(["bun", "run", scanTs, "--snapshot"], {
      stdout: "pipe", stderr: "pipe",
      env: { ...process.env, TZ: "America/Chicago" },
    });
    await save.exited;

    const snapshot = JSON.parse(await Bun.file(snapshotPath).text());
    expect(snapshot.tz).toBe("America/Chicago");
    expect(snapshot.timestamp).toContain("T"); // ISO format present

    // Tokyo dev compares against Chicago dev's snapshot
    const cmp = Bun.spawn(["bun", "run", scanTs, "--compare"], {
      stdout: "pipe", stderr: "pipe",
      env: { ...process.env, TZ: "Asia/Tokyo" },
    });
    const cmpOut = await new Response(cmp.stdout).text();
    const code = await cmp.exited;
    expect(code).toBe(0);
    // Should show the Chicago snapshot's date in the delta header
    expect(cmpOut).toContain("America/Chicago");
  });

  test("Date instance local fields differ per TZ in real subprocess", async () => {
    // Spawn a script that prints Date fields — simulates what scanner does internally
    const script = `
      const now = new Date("2026-06-15T04:00:00Z");
      console.log(JSON.stringify({
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hours: now.getHours(),
        date: now.getDate(),
        month: now.getMonth(),
        iso: now.toISOString(),
      }));
    `;
    const run = (tz: string) => {
      const proc = Bun.spawn(["bun", "-e", script], {
        stdout: "pipe", stderr: "pipe",
        env: { ...process.env, TZ: tz },
      });
      return new Response(proc.stdout).text().then(JSON.parse);
    };

    const [chicago, tokyo, utc] = await Promise.all([
      run("America/Chicago"),
      run("Asia/Tokyo"),
      run("UTC"),
    ]);

    // Each process sees its own TZ
    expect(chicago.tz).toBe("America/Chicago");
    expect(tokyo.tz).toBe("Asia/Tokyo");
    expect(utc.tz).toBe("UTC");

    // Same instant, different local hours (4 AM UTC)
    expect(utc.hours).toBe(4);       // 4 AM UTC
    expect(chicago.hours).toBe(23);  // 11 PM CDT (prev day)
    expect(tokyo.hours).toBe(13);    // 1 PM JST

    // Date boundary: UTC Jun 15, Chicago still Jun 14, Tokyo Jun 15
    expect(utc.date).toBe(15);
    expect(chicago.date).toBe(14);
    expect(tokyo.date).toBe(15);

    // ISO is always UTC — identical across all three
    expect(chicago.iso).toBe(tokyo.iso);
    expect(tokyo.iso).toBe(utc.iso);
    expect(utc.iso).toBe("2026-06-15T04:00:00.000Z");
  });

  test("snapshot date field reflects local time, not UTC", async () => {
    const snapshotPath = `${import.meta.dir}/.audit/xref-snapshot.json`;

    // Save snapshot from Tokyo (UTC+9)
    const save = Bun.spawn(["bun", "run", scanTs, "--snapshot"], {
      stdout: "pipe", stderr: "pipe",
      env: { ...process.env, TZ: "Asia/Tokyo" },
    });
    await save.exited;

    const snapshot = JSON.parse(await Bun.file(snapshotPath).text());
    expect(snapshot.tz).toBe("Asia/Tokyo");
    expect(snapshot.tzOverride).toBe(true);

    // date field should differ from the UTC portion of timestamp
    // Tokyo is UTC+9, so local hour >= UTC hour + 9
    const utcHour = parseInt(snapshot.timestamp.split("T")[1].slice(0, 2), 10);
    const localHour = parseInt(snapshot.date.split(" ")[1].slice(0, 2), 10);
    // Tokyo local hour = (utcHour + 9) % 24
    expect(localHour).toBe((utcHour + 9) % 24);
  });
});
