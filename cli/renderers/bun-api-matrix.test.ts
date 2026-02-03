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
  "Routing",
];

describe("BUN_API_CATALOG", () => {
  test("all 12 categories are present", () => {
    const found = new Set(BUN_API_CATALOG.map((e) => e.category));
    for (const cat of ALL_CATEGORIES) {
      expect(found.has(cat)).toBe(true);
    }
    expect(found.size).toBe(12);
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
    const validKinds = ["function", "class", "const", "namespace", "module", "object", "tagged template", "method", "getter"];
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
      "URL Pattern Matching",
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
  const STATUS_SYMBOLS: Record<BunApiStatus, string> = {
    stable: "\u25cf",       // ● filled circle
    new: "\u25c6",          // ◆ filled diamond
    experimental: "\u25d0", // ◐ half-filled circle
  };

  test("stable returns green circle \u25cf", () => {
    const result = renderStatus("stable");
    expect(result).toContain("\u25cf");
    expect(result).toContain("stable");
  });

  test("new returns blue diamond \u25c6", () => {
    const result = renderStatus("new");
    expect(result).toContain("\u25c6");
    expect(result).toContain("new");
  });

  test("experimental returns amber half-circle \u25d0", () => {
    const result = renderStatus("experimental");
    expect(result).toContain("\u25d0");
    expect(result).toContain("experimental");
  });

  test("each status has a unique symbol", () => {
    const symbols = Object.values(STATUS_SYMBOLS);
    expect(new Set(symbols).size).toBe(3);
  });

  test("stripped output is 'symbol + space + label'", () => {
    for (const [status, symbol] of Object.entries(STATUS_SYMBOLS)) {
      const stripped = Bun.stripANSI(renderStatus(status as BunApiStatus));
      expect(stripped).toBe(`${symbol} ${status}`);
    }
  });

  test("all outputs contain ANSI escape sequences", () => {
    for (const status of ["stable", "new", "experimental"] as BunApiStatus[]) {
      const raw = renderStatus(status);
      expect(raw).toContain("\x1b[");
      expect(raw).toEndWith("\x1b[0m");
    }
  });

  test("raw output is longer than stripped (ANSI wrapping present)", () => {
    for (const status of ["stable", "new", "experimental"] as BunApiStatus[]) {
      const raw = renderStatus(status);
      const stripped = Bun.stripANSI(raw);
      expect(raw.length).toBeGreaterThan(stripped.length);
    }
  });

  test("every catalog entry renders a valid status", () => {
    const validSymbols = new Set(Object.values(STATUS_SYMBOLS));
    for (const entry of BUN_API_CATALOG) {
      const stripped = Bun.stripANSI(renderStatus(entry.status));
      const symbol = stripped.charAt(0);
      expect(validSymbols.has(symbol)).toBe(true);
      expect(stripped).toContain(entry.status);
    }
  });
});

describe("renderSurface", () => {
  const FILLED = "\u25aa"; // ▪ small filled square
  const EMPTY  = "\u25ab"; // ▫ small empty square

  test("surface 1 \u25aa\u25ab\u25ab", () => {
    const result = renderSurface(1);
    expect(Bun.stripANSI(result)).toBe(`${FILLED}${EMPTY}${EMPTY}`);
  });

  test("surface 2 \u25aa\u25aa\u25ab", () => {
    const result = renderSurface(2);
    expect(Bun.stripANSI(result)).toBe(`${FILLED}${FILLED}${EMPTY}`);
  });

  test("surface 3 \u25aa\u25aa\u25aa", () => {
    const result = renderSurface(3);
    expect(Bun.stripANSI(result)).toBe(`${FILLED}${FILLED}${FILLED}`);
  });

  test("stripped output is always 3 characters", () => {
    for (const s of [1, 2, 3] as BunApiSurface[]) {
      const stripped = Bun.stripANSI(renderSurface(s));
      expect(stripped.length).toBe(3);
    }
  });

  test("filled and empty symbols are distinct", () => {
    expect(FILLED).not.toBe(EMPTY);
    expect(FILLED.codePointAt(0)).toBe(0x25AA);
    expect(EMPTY.codePointAt(0)).toBe(0x25AB);
  });

  test("ANSI coloring applied to both filled and empty segments", () => {
    const raw = renderSurface(2);
    // Two color regions: filled (purple) and empty (gray), each ANSI-wrapped
    const ansiEscapes = raw.match(/\x1b\[/g) || [];
    expect(ansiEscapes.length).toBeGreaterThanOrEqual(2);
  });

  test("every catalog entry renders a valid 3-glyph surface bar", () => {
    const validGlyphs = new Set([FILLED, EMPTY]);
    for (const entry of BUN_API_CATALOG) {
      const stripped = Bun.stripANSI(renderSurface(entry.surface));
      expect(stripped.length).toBe(3);
      for (const ch of stripped) {
        expect(validGlyphs.has(ch)).toBe(true);
      }
      // filled count must equal surface value
      const filledCount = [...stripped].filter(c => c === FILLED).length;
      expect(filledCount).toBe(entry.surface);
    }
  });
});

describe("renderScanner", () => {
  const CHECKMARK = "\u2713"; // ✓
  const DOT       = "\u00b7"; // ·

  test("used returns green checkmark \u2713", () => {
    const result = renderScanner(true);
    expect(Bun.stripANSI(result)).toBe(CHECKMARK);
  });

  test("unused returns dim dot \u00b7", () => {
    const result = renderScanner(false);
    expect(Bun.stripANSI(result)).toBe(DOT);
  });

  test("checkmark and dot are distinct codepoints", () => {
    expect(CHECKMARK.codePointAt(0)).toBe(0x2713);
    expect(DOT.codePointAt(0)).toBe(0x00B7);
    expect(CHECKMARK).not.toBe(DOT);
  });

  test("both outputs are ANSI-colored single glyphs", () => {
    for (const used of [true, false]) {
      const raw = renderScanner(used);
      const stripped = Bun.stripANSI(raw);
      expect(stripped.length).toBe(1);
      expect(raw).toContain("\x1b[");
      expect(raw).toEndWith("\x1b[0m");
      expect(raw.length).toBeGreaterThan(stripped.length);
    }
  });

  test("SCANNER_USED_APIS entries render \u2713, non-used render \u00b7", () => {
    for (const entry of BUN_API_CATALOG) {
      const used = SCANNER_USED_APIS.has(entry.api);
      const stripped = Bun.stripANSI(renderScanner(used));
      expect(stripped).toBe(used ? CHECKMARK : DOT);
    }
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
    expect(result.length).toBe(9);
  });

  test("empty for nonexistent topic", () => {
    const result = filterByTopic(BUN_API_CATALOG, "Nonexistent");
    expect(result.length).toBe(0);
  });
});

describe("Unicode symbol system", () => {
  // Full glyph palette used across the matrix
  const GLYPHS = {
    statusStable:       "\u25cf", // ● filled circle — green
    statusNew:          "\u25c6", // ◆ filled diamond — blue
    statusExperimental: "\u25d0", // ◐ half-filled circle — amber
    surfaceFilled:      "\u25aa", // ▪ small filled square — purple
    surfaceEmpty:       "\u25ab", // ▫ small empty square — gray
    scannerUsed:        "\u2713", // ✓ checkmark — green
    scannerUnused:      "\u00b7", // · middle dot — dim
    urlTruncated:       "\u2026", // … ellipsis
  };

  test("all 8 glyphs have distinct codepoints", () => {
    const codepoints = Object.values(GLYPHS).map(g => g.codePointAt(0));
    expect(new Set(codepoints).size).toBe(8);
  });

  test("all glyphs are single-character", () => {
    for (const [name, glyph] of Object.entries(GLYPHS)) {
      expect(glyph.length).toBe(1);
    }
  });

  test("all glyphs are within BMP (U+0000–U+FFFF)", () => {
    for (const glyph of Object.values(GLYPHS)) {
      const cp = glyph.codePointAt(0)!;
      expect(cp).toBeGreaterThanOrEqual(0x00);
      expect(cp).toBeLessThanOrEqual(0xFFFF);
    }
  });

  test("status glyphs are in Unicode Geometric Shapes block (U+25A0–U+25FF)", () => {
    for (const glyph of [GLYPHS.statusStable, GLYPHS.statusNew, GLYPHS.statusExperimental]) {
      const cp = glyph.codePointAt(0)!;
      expect(cp).toBeGreaterThanOrEqual(0x25A0);
      expect(cp).toBeLessThanOrEqual(0x25FF);
    }
  });

  test("surface glyphs are in Unicode Geometric Shapes block", () => {
    for (const glyph of [GLYPHS.surfaceFilled, GLYPHS.surfaceEmpty]) {
      const cp = glyph.codePointAt(0)!;
      expect(cp).toBeGreaterThanOrEqual(0x25A0);
      expect(cp).toBeLessThanOrEqual(0x25FF);
    }
  });

  test("checkmark is in Dingbats block (U+2700–U+27BF)", () => {
    const cp = GLYPHS.scannerUsed.codePointAt(0)!;
    expect(cp).toBeGreaterThanOrEqual(0x2700);
    expect(cp).toBeLessThanOrEqual(0x27BF);
  });

  test("full catalog renders consistently with all glyph types", () => {
    const validStatusSymbols = new Set([GLYPHS.statusStable, GLYPHS.statusNew, GLYPHS.statusExperimental]);
    const validSurfaceSymbols = new Set([GLYPHS.surfaceFilled, GLYPHS.surfaceEmpty]);
    const validScannerSymbols = new Set([GLYPHS.scannerUsed, GLYPHS.scannerUnused]);

    for (const entry of BUN_API_CATALOG) {
      // Status glyph
      const statusStripped = Bun.stripANSI(renderStatus(entry.status));
      expect(validStatusSymbols.has(statusStripped.charAt(0))).toBe(true);

      // Surface glyphs
      const surfaceStripped = Bun.stripANSI(renderSurface(entry.surface));
      for (const ch of surfaceStripped) {
        expect(validSurfaceSymbols.has(ch)).toBe(true);
      }

      // Scanner glyph
      const scannerStripped = Bun.stripANSI(renderScanner(SCANNER_USED_APIS.has(entry.api)));
      expect(validScannerSymbols.has(scannerStripped)).toBe(true);
    }
  });

  test("Bun.stringWidth counts all glyphs as width 1", () => {
    for (const glyph of Object.values(GLYPHS)) {
      expect(Bun.stringWidth(glyph)).toBe(1);
    }
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
