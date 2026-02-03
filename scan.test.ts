import { describe, test, expect } from "bun:test";
import { isFeatureFlagActive, classifyEnvFlag, effectiveLinker, platformHelp, shouldWarnMise, parseTzFromEnv, parseEnvVar, validateThreatFeed, ThreatFeedItemSchema, semverBumpType, isVulnerable, semverCompare } from "./scan.ts";

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

describe("Bun.semver integration (semverBumpType, isVulnerable, semverCompare)", () => {
  test("semverBumpType classifies patch bump", () => {
    expect(semverBumpType("1.2.3", "1.2.4")).toBe("patch");
  });

  test("semverBumpType classifies minor bump", () => {
    expect(semverBumpType("1.2.3", "1.3.0")).toBe("minor");
  });

  test("semverBumpType classifies major bump", () => {
    expect(semverBumpType("1.2.3", "2.0.0")).toBe("major");
  });

  test("semverBumpType returns null for same version", () => {
    expect(semverBumpType("1.2.3", "1.2.3")).toBeNull();
  });

  test("semverBumpType returns null for invalid input", () => {
    expect(semverBumpType("latest", "1.0.0")).toBeNull();
    expect(semverBumpType("1.0.0", "nope")).toBeNull();
  });

  test("isVulnerable matches event-stream incident range", () => {
    expect(isVulnerable("3.3.6", ">=3.3.6 <4.0.0")).toBe(true);
    expect(isVulnerable("3.3.5", ">=3.3.6 <4.0.0")).toBe(false);
    expect(isVulnerable("4.0.0", ">=3.3.6 <4.0.0")).toBe(false);
  });

  test("isVulnerable handles caret and tilde ranges", () => {
    expect(isVulnerable("1.3.0", "^1.2.0")).toBe(true);
    expect(isVulnerable("2.0.0", "^1.2.0")).toBe(false);
    expect(isVulnerable("1.2.9", "~1.2.0")).toBe(true);
    expect(isVulnerable("1.3.0", "~1.2.0")).toBe(false);
  });

  test("semverCompare orders versions correctly", () => {
    expect(semverCompare("2.0.0", "1.0.0")).toBe(1);
    expect(semverCompare("1.0.0", "2.0.0")).toBe(-1);
    expect(semverCompare("1.0.0", "1.0.0")).toBe(0);
  });

  test("semverCompare handles patch and minor differences", () => {
    expect(semverCompare("1.2.4", "1.2.3")).toBe(1);
    expect(semverCompare("1.3.0", "1.2.9")).toBe(1);
    expect(semverCompare("1.0.0", "1.0.1")).toBe(-1);
  });
});

describe("ThreatFeedItemSchema (Zod validation)", () => {
  test("validates a valid threat feed item", () => {
    const item = {
      package: "event-stream",
      version: "3.3.6",
      url: "https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident",
      description: "event-stream is a malicious package",
      categories: ["malware"],
    };
    expect(() => ThreatFeedItemSchema.parse(item)).not.toThrow();
  });

  test("validates item with nullable url and description", () => {
    const item = {
      package: "bad-pkg",
      version: "1.0.0",
      url: null,
      description: null,
      categories: ["backdoor"],
    };
    expect(() => ThreatFeedItemSchema.parse(item)).not.toThrow();
  });

  test("validates all category types", () => {
    for (const cat of ["backdoor", "botnet", "malware", "protestware", "adware"]) {
      const item = { package: "x", version: "1.0.0", url: null, description: null, categories: [cat] };
      expect(() => ThreatFeedItemSchema.parse(item)).not.toThrow();
    }
  });

  test("rejects invalid category", () => {
    const item = { package: "x", version: "1.0.0", url: null, description: null, categories: ["unknown"] };
    expect(() => ThreatFeedItemSchema.parse(item)).toThrow();
  });

  test("rejects missing package field", () => {
    const item = { version: "1.0.0", url: null, description: null, categories: [] };
    expect(() => ThreatFeedItemSchema.parse(item)).toThrow();
  });

  test("rejects non-string version", () => {
    const item = { package: "x", version: 123, url: null, description: null, categories: [] };
    expect(() => ThreatFeedItemSchema.parse(item)).toThrow();
  });

  test("validateThreatFeed parses valid array", () => {
    const feed = [
      { package: "event-stream", version: "3.3.6", url: null, description: "malicious", categories: ["malware"] },
      { package: "flatmap-stream", version: "0.1.1", url: null, description: "backdoor", categories: ["backdoor", "botnet"] },
    ];
    const result = validateThreatFeed(feed);
    expect(result).toHaveLength(2);
    expect(result[0].package).toBe("event-stream");
    expect(result[1].categories).toContain("backdoor");
  });

  test("validateThreatFeed accepts empty array (no threats)", () => {
    expect(validateThreatFeed([])).toEqual([]);
  });

  test("validateThreatFeed throws on invalid data", () => {
    expect(() => validateThreatFeed("not an array")).toThrow();
    expect(() => validateThreatFeed([{ bad: "data" }])).toThrow();
  });
});

describe("Bun API integration (scanner uses Bun.hash, Bun.file, Bun.semver, dns)", () => {
  const scanTs = `${import.meta.dir}/scan.ts`;

  test("Bun.hash.wyhash produces consistent hex lockHash", () => {
    const content = "lockfile content v1";
    const hash1 = Bun.hash.wyhash(content).toString(16);
    const hash2 = Bun.hash.wyhash(content).toString(16);
    expect(hash1).toBe(hash2);
    expect(hash1.length).toBeGreaterThan(0);
    // Different content → different hash
    const hash3 = Bun.hash.wyhash("lockfile content v2").toString(16);
    expect(hash3).not.toBe(hash1);
  });

  test("Bun.hash.wyhash handles binary (Uint8Array) like bun.lockb", () => {
    const bytes = new Uint8Array([0x00, 0x62, 0x75, 0x6e]); // \0bun header
    const hash = Bun.hash.wyhash(bytes).toString(16);
    expect(hash.length).toBeGreaterThan(0);
    // Same bytes → same hash
    expect(Bun.hash.wyhash(new Uint8Array([0x00, 0x62, 0x75, 0x6e])).toString(16)).toBe(hash);
  });

  test("Bun.hash accepts all input types: string, TypedArray, DataView, ArrayBuffer", () => {
    const str = "some data here";
    const arr = new Uint8Array([1, 2, 3, 4]);

    const fromString = Bun.hash(str);
    const fromTypedArray = Bun.hash(arr);
    const fromArrayBuffer = Bun.hash(arr.buffer);
    const fromDataView = Bun.hash(new DataView(arr.buffer));

    // All return bigint
    expect(typeof fromString).toBe("bigint");
    expect(typeof fromTypedArray).toBe("bigint");
    expect(typeof fromArrayBuffer).toBe("bigint");
    expect(typeof fromDataView).toBe("bigint");

    // SharedArrayBuffer
    const shared = new SharedArrayBuffer(4);
    new Uint8Array(shared).set(arr);
    const fromShared = Bun.hash(shared);
    expect(typeof fromShared).toBe("bigint");

    // Same binary input via different views → same hash
    expect(fromTypedArray).toBe(fromArrayBuffer);
    expect(fromArrayBuffer).toBe(fromDataView);
    expect(fromDataView).toBe(fromShared);

    // String vs binary → different hash
    expect(fromString).not.toBe(fromTypedArray);
  });

  test("Bun.hash with integer seed", () => {
    expect(Bun.hash("some data here", 1234)).toBe(15724820720172937558n);
  });

  test("Bun.hash with BigInt seed above MAX_SAFE_INTEGER", () => {
    const bigSeed = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
    const hash = Bun.hash("data", bigSeed);
    expect(typeof hash).toBe("bigint");
    // Different from default seed
    expect(hash).not.toBe(Bun.hash("data"));
    // Different from small seed
    expect(hash).not.toBe(Bun.hash("data", 1234));
  });

  test("Bun.hash.wyhash with seed", () => {
    const a = Bun.hash.wyhash("data", 0);
    const b = Bun.hash.wyhash("data", 1234);
    expect(a).not.toBe(b); // different seeds → different hashes
    expect(typeof a).toBe("bigint");
  });

  test("all Bun.hash algorithms produce consistent output with seed", () => {
    const data = "data";
    const seed = 1234;

    // 64-bit algorithms (return bigint)
    const wyhash    = Bun.hash.wyhash(data, seed);
    const city64    = Bun.hash.cityHash64(data, seed);
    const xx64      = Bun.hash.xxHash64(data, seed);
    const xx3       = Bun.hash.xxHash3(data, seed);
    const murmur64  = Bun.hash.murmur64v2(data, seed);
    const rapid     = Bun.hash.rapidhash(data, seed);

    for (const h of [wyhash, city64, xx64, xx3, murmur64, rapid]) {
      expect(typeof h).toBe("bigint");
      expect(h).toBeGreaterThan(0n);
    }

    // 32-bit algorithms (return number)
    const crc32     = Bun.hash.crc32(data, seed);
    const adler32   = Bun.hash.adler32(data, seed);
    const city32    = Bun.hash.cityHash32(data, seed);
    const xx32      = Bun.hash.xxHash32(data, seed);
    const murmur3   = Bun.hash.murmur32v3(data, seed);
    const murmur2   = Bun.hash.murmur32v2(data, seed);

    for (const h of [crc32, adler32, city32, xx32, murmur3, murmur2]) {
      expect(typeof h).toBe("number");
      expect(h).toBeGreaterThan(0);
    }

    // All 12 algorithms produce unique hashes for the same input
    const all = [wyhash, city64, xx64, xx3, murmur64, rapid, BigInt(crc32), BigInt(adler32), BigInt(city32), BigInt(xx32), BigInt(murmur3), BigInt(murmur2)];
    const unique = new Set(all.map(String));
    expect(unique.size).toBe(12);
  });

  test("all Bun.hash algorithms are deterministic", () => {
    const data = "lockfile content";
    const seed = 42;

    // Run each twice — must be identical
    expect(Bun.hash.wyhash(data, seed)).toBe(Bun.hash.wyhash(data, seed));
    expect(Bun.hash.crc32(data, seed)).toBe(Bun.hash.crc32(data, seed));
    expect(Bun.hash.adler32(data, seed)).toBe(Bun.hash.adler32(data, seed));
    expect(Bun.hash.cityHash32(data, seed)).toBe(Bun.hash.cityHash32(data, seed));
    expect(Bun.hash.cityHash64(data, seed)).toBe(Bun.hash.cityHash64(data, seed));
    expect(Bun.hash.xxHash32(data, seed)).toBe(Bun.hash.xxHash32(data, seed));
    expect(Bun.hash.xxHash64(data, seed)).toBe(Bun.hash.xxHash64(data, seed));
    expect(Bun.hash.xxHash3(data, seed)).toBe(Bun.hash.xxHash3(data, seed));
    expect(Bun.hash.murmur32v3(data, seed)).toBe(Bun.hash.murmur32v3(data, seed));
    expect(Bun.hash.murmur32v2(data, seed)).toBe(Bun.hash.murmur32v2(data, seed));
    expect(Bun.hash.murmur64v2(data, seed)).toBe(Bun.hash.murmur64v2(data, seed));
    expect(Bun.hash.rapidhash(data, seed)).toBe(Bun.hash.rapidhash(data, seed));
  });

  test("Bun.file reads package.json and returns valid JSON", async () => {
    // Use any real project — scanner itself now has a package.json
    const file = Bun.file(`${import.meta.dir}/package.json`);
    expect(await file.exists()).toBe(true);
    const pkg = JSON.parse(await file.text());
    expect(pkg.name).toBe("security-scanner-api");
  });

  test("Bun.file.exists() returns false for missing files", async () => {
    const missing = Bun.file(`${import.meta.dir}/does-not-exist-xyz.json`);
    expect(await missing.exists()).toBe(false);
  });

  test("Bun.semver.satisfies matches vulnerability ranges", () => {
    // event-stream incident: 3.3.6 was malicious
    expect(Bun.semver.satisfies("3.3.6", ">=3.3.6 <4.0.0")).toBe(true);
    expect(Bun.semver.satisfies("4.0.0", ">=3.3.6 <4.0.0")).toBe(false);
    expect(Bun.semver.satisfies("3.3.5", ">=3.3.6 <4.0.0")).toBe(false);
    // Patch range
    expect(Bun.semver.satisfies("1.2.5", ">=1.0.0 <1.2.5")).toBe(false);
    expect(Bun.semver.satisfies("1.2.4", ">=1.0.0 <1.2.5")).toBe(true);
  });

  test("Bun.semver.satisfies handles caret and tilde ranges", () => {
    expect(Bun.semver.satisfies("1.3.0", "^1.2.0")).toBe(true);
    expect(Bun.semver.satisfies("2.0.0", "^1.2.0")).toBe(false);
    expect(Bun.semver.satisfies("1.2.9", "~1.2.0")).toBe(true);
    expect(Bun.semver.satisfies("1.3.0", "~1.2.0")).toBe(false);
  });

  test("dns.getCacheStats returns valid stats object", async () => {
    const { dns } = await import("bun");
    const stats = dns.getCacheStats();
    expect(stats).toHaveProperty("cacheHitsCompleted");
    expect(stats).toHaveProperty("cacheMisses");
    expect(stats).toHaveProperty("size");
    expect(stats).toHaveProperty("errors");
    expect(stats).toHaveProperty("totalCount");
    expect(typeof stats.totalCount).toBe("number");
  });

  test("--json output includes all ProjectInfo fields for every project", async () => {
    const proc = Bun.spawn(["bun", "run", scanTs, "--json"], {
      stdout: "pipe", stderr: "pipe",
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;
    const projects = JSON.parse(out);
    expect(projects.length).toBeGreaterThan(0);

    // Every project must have the core fields
    const requiredFields = [
      "folder", "name", "deps", "devDeps", "totalDeps",
      "engine", "lock", "bunfig", "workspace",
      "hasPkg", "lockHash", "projectTz", "projectDnsTtl",
      "envFiles", "trustedDeps", "peerDeps", "peerDepsMeta",
      "installPeer", "securityScanner",
    ];
    for (const p of projects) {
      for (const field of requiredFields) {
        expect(p).toHaveProperty(field);
      }
    }
  });

  test("every project with a lockfile has a non-empty lockHash", async () => {
    const proc = Bun.spawn(["bun", "run", scanTs, "--json"], {
      stdout: "pipe", stderr: "pipe",
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;
    const projects = JSON.parse(out);

    const withLock = projects.filter((p: any) => p.lock === "bun.lock" || p.lock === "bun.lockb");
    expect(withLock.length).toBeGreaterThan(0);
    for (const p of withLock) {
      expect(p.lockHash).not.toBe("-");
      expect(p.lockHash.length).toBeGreaterThan(4); // hex hash
    }
  });

  test("all projects with package.json are scanned (none dropped)", async () => {
    const proc = Bun.spawn(["bun", "run", scanTs, "--json"], {
      stdout: "pipe", stderr: "pipe",
    });
    const out = await new Response(proc.stdout).text();
    await proc.exited;
    const projects = JSON.parse(out);

    const withPkg = projects.filter((p: any) => p.hasPkg);
    // Must match the known project count from --audit (50)
    expect(withPkg.length).toBeGreaterThanOrEqual(50);

    // Every project with package.json should have a name
    for (const p of withPkg) {
      expect(p.name).not.toBe("-");
      expect(typeof p.deps).toBe("number");
      expect(typeof p.devDeps).toBe("number");
      expect(p.totalDeps).toBe(p.deps + p.devDeps);
    }
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
