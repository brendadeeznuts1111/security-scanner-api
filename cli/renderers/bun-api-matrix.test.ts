import { describe, expect, test } from "bun:test";
import {
  BUN_API_CATALOG,
  SCANNER_USED_APIS,
  formatDocUrl,
  filterByCategory,
  filterByTopic,
  apiCount,
  colorize,
  renderStatus,
  renderSurface,
  renderScanner,
  BunApiMatrixRenderer,
  type BunApiCategory,
  type BunApiStatus,
  type BunApiSurface,
} from "./bun-api-matrix";

const ALL_CATEGORIES: BunApiCategory[] = [
  "HTTP & Networking",
  "Shell & Process",
  "File I/O",
  "Build & Bundling",
  "Hashing & Security",
  "Databases",
  "Compression",
  "Utilities",
  "Streaming",
  "Advanced",
  "Semver",
];

describe("BUN_API_CATALOG", () => {
  test("all 11 categories are present", () => {
    const found = new Set(BUN_API_CATALOG.map((e) => e.category));
    for (const cat of ALL_CATEGORIES) {
      expect(found.has(cat)).toBe(true);
    }
    expect(found.size).toBe(11);
  });

  test("no duplicate API names", () => {
    const names = BUN_API_CATALOG.map((e) => e.api);
    expect(new Set(names).size).toBe(names.length);
  });

  test("all entries have non-empty api, category, topic, type, and docUrl", () => {
    for (const entry of BUN_API_CATALOG) {
      expect(entry.api.length).toBeGreaterThan(0);
      expect(entry.category.length).toBeGreaterThan(0);
      expect(entry.topic.length).toBeGreaterThan(0);
      expect(entry.type.length).toBeGreaterThan(0);
      expect(entry.docUrl.length).toBeGreaterThan(0);
    }
  });

  test("all docUrls start with https://bun.com/docs", () => {
    for (const entry of BUN_API_CATALOG) {
      expect(entry.docUrl.startsWith("https://bun.com/docs")).toBe(true);
    }
  });

  test("count matches apiCount()", () => {
    expect(BUN_API_CATALOG.length).toBe(apiCount());
  });

  test("protocol is non-empty only for network-related APIs", () => {
    const withProtocol = BUN_API_CATALOG.filter((e) => e.protocol !== "");
    for (const entry of withProtocol) {
      expect(["HTTP", "TCP", "UDP", "WebSocket", "DNS"]).toContain(entry.protocol);
    }
    expect(withProtocol.length).toBeGreaterThan(0);
  });

  test("all HTTP & Networking entries have a protocol", () => {
    const networking = BUN_API_CATALOG.filter((e) => e.category === "HTTP & Networking");
    for (const entry of networking) {
      expect(entry.protocol.length).toBeGreaterThan(0);
    }
  });

  test("type field uses known kind prefixes", () => {
    const validKinds = ["function", "class", "const", "namespace", "module", "object", "tagged template"];
    for (const entry of BUN_API_CATALOG) {
      const matchesKind = validKinds.some((k) => entry.type.startsWith(k));
      expect(matchesKind).toBe(true);
    }
  });

  test("topics match official Bun docs groupings", () => {
    const knownTopics = new Set([
      "HTTP Server", "TCP Sockets", "UDP Sockets", "WebSockets", "DNS",
      "Shell", "Child Processes",
      "File I/O", "Bundler", "Transpiler", "Routing", "Module Loaders",
      "Hashing", "System & Environment",
      "SQLite", "PostgreSQL Client", "Redis (Valkey) Client", "S3 Storage",
      "Compression",
      "Utilities", "Sleep & Timing", "Random & UUID",
      "Comparison & Inspection", "String & Text Processing",
      "Module Resolution", "URL & Path Utilities", "Memory & Buffer Management",
      "Glob", "Parsing & Formatting", "Cookies",
      "Streaming HTML", "Stream Processing",
      "FFI", "Testing", "Workers", "Low-level / Internals", "Node-API", "import.meta",
    ]);
    for (const entry of BUN_API_CATALOG) {
      expect(knownTopics.has(entry.topic)).toBe(true);
    }
  });

  test("status is a valid BunApiStatus", () => {
    const validStatuses: BunApiStatus[] = ["stable", "new", "experimental"];
    for (const entry of BUN_API_CATALOG) {
      expect(validStatuses).toContain(entry.status);
    }
  });

  test("surface is 1, 2, or 3", () => {
    const validSurfaces: BunApiSurface[] = [1, 2, 3];
    for (const entry of BUN_API_CATALOG) {
      expect(validSurfaces).toContain(entry.surface);
    }
  });

  test("all three status values are represented", () => {
    const statuses = new Set(BUN_API_CATALOG.map((e) => e.status));
    expect(statuses.has("stable")).toBe(true);
    expect(statuses.has("new")).toBe(true);
    expect(statuses.has("experimental")).toBe(true);
  });

  test("all three surface levels are represented", () => {
    const surfaces = new Set(BUN_API_CATALOG.map((e) => e.surface));
    expect(surfaces.has(1)).toBe(true);
    expect(surfaces.has(2)).toBe(true);
    expect(surfaces.has(3)).toBe(true);
  });
});

describe("SCANNER_USED_APIS", () => {
  test("known APIs are present", () => {
    expect(SCANNER_USED_APIS.has("Bun.hash")).toBe(true);
    expect(SCANNER_USED_APIS.has("Bun.semver")).toBe(true);
  });

  test("every entry exists in the catalog", () => {
    const catalogApis = new Set(BUN_API_CATALOG.map((e) => e.api));
    for (const api of SCANNER_USED_APIS) {
      expect(catalogApis.has(api)).toBe(true);
    }
  });
});

describe("colorize", () => {
  test("wraps text with ANSI codes from HSL", () => {
    const result = colorize("test", "hsl(140, 70%, 40%)");
    expect(result).toContain("test");
    expect(result).toContain("\x1b[");
    expect(result).toEndWith("\x1b[0m");
  });

  test("returns plain text on invalid color", () => {
    const result = colorize("test", "not-a-color");
    expect(result).toBe("test");
  });
});

describe("renderStatus", () => {
  test("stable returns green circle", () => {
    const result = renderStatus("stable");
    expect(result).toContain("\u25cf");
    expect(result).toContain("stable");
  });

  test("new returns blue diamond", () => {
    const result = renderStatus("new");
    expect(result).toContain("\u25c6");
    expect(result).toContain("new");
  });

  test("experimental returns amber half-circle", () => {
    const result = renderStatus("experimental");
    expect(result).toContain("\u25d0");
    expect(result).toContain("experimental");
  });
});

describe("renderSurface", () => {
  test("surface 1 has 1 filled + 2 empty", () => {
    const result = renderSurface(1);
    expect(Bun.stripANSI(result)).toBe("\u25aa\u25ab\u25ab");
  });

  test("surface 2 has 2 filled + 1 empty", () => {
    const result = renderSurface(2);
    expect(Bun.stripANSI(result)).toBe("\u25aa\u25aa\u25ab");
  });

  test("surface 3 has 3 filled + 0 empty", () => {
    const result = renderSurface(3);
    expect(Bun.stripANSI(result)).toBe("\u25aa\u25aa\u25aa");
  });
});

describe("renderScanner", () => {
  test("used returns green checkmark", () => {
    const result = renderScanner(true);
    expect(Bun.stripANSI(result)).toBe("\u2713");
  });

  test("unused returns dim dot", () => {
    const result = renderScanner(false);
    expect(Bun.stripANSI(result)).toBe("\u00b7");
  });
});

describe("formatDocUrl", () => {
  test("short URL returned unchanged", () => {
    const url = "https://bun.com/docs/api/http";
    expect(formatDocUrl(url)).toBe(url);
  });

  test("long URL truncated with ellipsis", () => {
    const url = "https://bun.com/docs/api/some-very-long-path-that-exceeds-default-max-length";
    const result = formatDocUrl(url);
    expect(result.length).toBe(48);
    expect(result.endsWith("\u2026")).toBe(true);
  });

  test("explicit large maxLen preserves full URL", () => {
    const url = "https://bun.com/docs/api/some-very-long-path-that-exceeds-default-max-length";
    expect(formatDocUrl(url, 200)).toBe(url);
  });
});

describe("filterByCategory", () => {
  test("correct count for HTTP & Networking", () => {
    const result = filterByCategory(BUN_API_CATALOG, "HTTP & Networking");
    expect(result.length).toBe(9);
  });

  test("empty for invalid category", () => {
    const result = filterByCategory(BUN_API_CATALOG, "Nonexistent" as BunApiCategory);
    expect(result.length).toBe(0);
  });
});

describe("filterByTopic", () => {
  test("correct count for DNS topic", () => {
    const result = filterByTopic(BUN_API_CATALOG, "DNS");
    expect(result.length).toBe(3);
  });

  test("correct count for Compression topic", () => {
    const result = filterByTopic(BUN_API_CATALOG, "Compression");
    expect(result.length).toBe(8);
  });

  test("empty for nonexistent topic", () => {
    const result = filterByTopic(BUN_API_CATALOG, "Nonexistent");
    expect(result.length).toBe(0);
  });
});

describe("BunApiMatrixRenderer", () => {
  const renderer = new BunApiMatrixRenderer();

  test("render() with no options does not throw", () => {
    expect(() => renderer.render()).not.toThrow();
  });

  test("render() with category filter does not throw", () => {
    expect(() => renderer.render({ category: "Hashing & Security" })).not.toThrow();
  });

  test("render() with topic filter does not throw", () => {
    expect(() => renderer.render({ topic: "DNS" })).not.toThrow();
  });

  test("render() with every category individually does not throw", () => {
    for (const category of ALL_CATEGORIES) {
      expect(() => renderer.render({ category })).not.toThrow();
    }
  });
});
