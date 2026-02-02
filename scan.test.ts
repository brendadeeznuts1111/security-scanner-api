import { describe, test, expect } from "bun:test";
import { isFeatureFlagActive, classifyEnvFlag, effectiveLinker, platformHelp, shouldWarnMise } from "./scan.ts";

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
