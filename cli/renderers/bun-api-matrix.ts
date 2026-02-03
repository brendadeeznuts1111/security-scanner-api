export type BunApiCategory =
  | "HTTP & Networking"
  | "Shell & Process"
  | "File I/O"
  | "Build & Bundling"
  | "Hashing & Security"
  | "Databases"
  | "Compression"
  | "Utilities"
  | "Streaming"
  | "Advanced"
  | "Semver"
  | "Routing";

export type BunApiStatus = "stable" | "new" | "experimental";

export type BunApiSurface = 1 | 2 | 3;

export type BunApiEntry = {
  api: string;
  category: BunApiCategory;
  topic: string;
  type: string;
  params: string;
  protocol: string;
  status: BunApiStatus;
  surface: BunApiSurface;
  docUrl: string;
};

export const BUN_DOC_BASE = "https://bun.sh/docs";

// ── Color helpers via Bun.color HSL → ANSI ──

const RESET = "\x1b[0m";

export function colorize(text: string, hsl: string): string {
  const ansi = Bun.color(hsl, "ansi-16m");
  if (!ansi) return text;
  return `${ansi}${text}${RESET}`;
}

const STATUS_DISPLAY: Record<BunApiStatus, { symbol: string; hsl: string }> = {
  stable:       { symbol: "\u25cf", hsl: "hsl(140, 70%, 40%)" },   // ● green
  new:          { symbol: "\u25c6", hsl: "hsl(210, 80%, 55%)" },   // ◆ blue
  experimental: { symbol: "\u25d0", hsl: "hsl(40, 90%, 50%)" },    // ◐ amber
};

export function renderStatus(status: BunApiStatus): string {
  const d = STATUS_DISPLAY[status];
  return colorize(`${d.symbol} ${status}`, d.hsl);
}

const SURFACE_FILLED = "\u25aa";   // ▪
const SURFACE_EMPTY  = "\u25ab";   // ▫

export function renderSurface(surface: BunApiSurface): string {
  const filled = SURFACE_FILLED.repeat(surface);
  const empty  = SURFACE_EMPTY.repeat(3 - surface);
  return colorize(filled, "hsl(270, 60%, 55%)") + colorize(empty, "hsl(0, 0%, 30%)");
}

export function renderScanner(used: boolean): string {
  return used
    ? colorize("\u2713", "hsl(140, 70%, 40%)")   // ✓ green
    : colorize("\u00b7", "hsl(0, 0%, 35%)");      // · dim
}

// ── Catalog ──
// status:  stable = core API since early Bun, new = added ~1.1+, experimental = unstable / evolving
// surface: 1 = single fn/const, 2 = fn with options or small namespace, 3 = class/module with many methods

export const BUN_API_CATALOG: readonly BunApiEntry[] = [
  // ── HTTP & Networking ──
  { api: "Bun.serve", category: "HTTP & Networking", topic: "HTTP Server", type: "function \u2192 Server", params: "{fetch, port?, hostname?, tls?, websocket?, protocol?}", protocol: "HTTP", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/http` },
  { api: "Bun.fetch", category: "HTTP & Networking", topic: "HTTP Server", type: "const \u2192 typeof fetch", params: "input, init?", protocol: "HTTP", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/http` },
  { api: "Bun.listen", category: "HTTP & Networking", topic: "TCP Sockets", type: "function \u2192 TCPSocket", params: "{hostname, port, socket}", protocol: "TCP", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/tcp` },
  { api: "Bun.connect", category: "HTTP & Networking", topic: "TCP Sockets", type: "function \u2192 Promise<Socket>", params: "TCPSocketConnectOptions | UnixSocketOptions", protocol: "TCP", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/tcp` },
  { api: "Bun.udpSocket", category: "HTTP & Networking", topic: "UDP Sockets", type: "function \u2192 UDPSocket", params: "{port?, socket}", protocol: "UDP", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/udp` },
  { api: "WebSocket", category: "HTTP & Networking", topic: "WebSockets", type: "class", params: "url, protocols?", protocol: "WebSocket", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/websockets` },
  { api: "Bun.dns.lookup", category: "HTTP & Networking", topic: "DNS", type: "function \u2192 Promise<Address[]>", params: "hostname, options?", protocol: "DNS", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/dns` },
  { api: "Bun.dns.prefetch", category: "HTTP & Networking", topic: "DNS", type: "function \u2192 void", params: "hostname", protocol: "DNS", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/dns` },
  { api: "Bun.dns.getCacheStats", category: "HTTP & Networking", topic: "DNS", type: "function \u2192 DNSCacheStats", params: "", protocol: "DNS", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/dns` },

  // ── Shell & Process ──
  { api: "$ (shell)", category: "Shell & Process", topic: "Shell", type: "tagged template \u2192 ShellPromise", params: "strings, ...expressions", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/runtime/shell` },
  { api: "$.braces", category: "Shell & Process", topic: "Shell", type: "function \u2192 string[]", params: "pattern", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/runtime/shell` },
  { api: "$.escape", category: "Shell & Process", topic: "Shell", type: "function \u2192 string", params: "input", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/runtime/shell` },
  { api: "Bun.spawn", category: "Shell & Process", topic: "Child Processes", type: "function \u2192 Subprocess", params: "cmd, options?", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/spawn` },
  { api: "Bun.spawnSync", category: "Shell & Process", topic: "Child Processes", type: "function \u2192 SyncSubprocess", params: "cmd, options?", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/spawn` },

  // ── File I/O ──
  { api: "Bun.file", category: "File I/O", topic: "File I/O", type: "function \u2192 BunFile", params: "path | fd | Uint8Array, options?", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/file-io` },
  { api: "Bun.write", category: "File I/O", topic: "File I/O", type: "function \u2192 Promise<number>", params: "dest, data", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/file-io` },
  { api: "Bun.stdin", category: "File I/O", topic: "File I/O", type: "const \u2192 BunFile", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/file-io` },
  { api: "Bun.stdout", category: "File I/O", topic: "File I/O", type: "const \u2192 BunFile", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/file-io` },
  { api: "Bun.stderr", category: "File I/O", topic: "File I/O", type: "const \u2192 BunFile", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/file-io` },
  { api: "Bun.mmap", category: "File I/O", topic: "Low-level / Internals", type: "function \u2192 Buffer", params: "path, {offset?, size?, shared?}", protocol: "", status: "experimental", surface: 2, docUrl: `${BUN_DOC_BASE}/api/file-io` },

  // ── Build & Bundling ──
  { api: "Bun.build", category: "Build & Bundling", topic: "Bundler", type: "function \u2192 Promise<BuildOutput>", params: "{entrypoints, outdir?, target?, metafile?}", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/bundler` },
  { api: "Bun.Transpiler", category: "Build & Bundling", topic: "Transpiler", type: "class", params: "{loader?, tsconfig?}", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/transpiler` },
  { api: "Bun.FileSystemRouter", category: "Build & Bundling", topic: "Routing", type: "class", params: "{style, dir, origin?}", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/file-system-router` },
  { api: "Bun.plugin", category: "Build & Bundling", topic: "Module Loaders", type: "const \u2192 BunRegisterPlugin", params: "{setup}", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/runtime/plugins` },
  { api: "bun:bundle", category: "Build & Bundling", topic: "Bundler", type: "module", params: "import {feature} from 'bun:bundle'", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/bundler` },

  // ── Hashing & Security ──
  { api: "Bun.password", category: "Hashing & Security", topic: "Hashing", type: "const \u2192 {hash, hashSync, verify, verifySync}", params: "password, algorithm?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.hash", category: "Hashing & Security", topic: "Hashing", type: "const \u2192 (data, seed?) => number | bigint", params: "data, seed?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.CryptoHasher", category: "Hashing & Security", topic: "Hashing", type: "class", params: "algorithm", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.sha", category: "Hashing & Security", topic: "Hashing", type: "function \u2192 ArrayBuffer", params: "data, algorithm?", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.secrets", category: "Hashing & Security", topic: "System & Environment", type: "const \u2192 {get, set, delete}", params: "{name, service, value?} (async-context safe)", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.CSRF", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.MD4", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.MD5", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.SHA1", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.SHA224", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.SHA256", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.SHA384", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.SHA512", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },
  { api: "Bun.SHA512_256", category: "Hashing & Security", topic: "Hashing", type: "class", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/hashing` },

  // ── Databases ──
  { api: "bun:sqlite", category: "Databases", topic: "SQLite", type: "module \u2192 Database", params: "filename?, options?", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/sqlite` },
  { api: "Bun.sql", category: "Databases", topic: "PostgreSQL Client", type: "const \u2192 SQL (tagged template)", params: "template literal / url", protocol: "TCP", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/sql` },
  { api: "Bun.redis", category: "Databases", topic: "Redis (Valkey) Client", type: "const \u2192 RedisClient", params: "url?", protocol: "TCP", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/redis` },
  { api: "Bun.S3Client", category: "Databases", topic: "S3 Storage", type: "class \u2192 S3Client", params: "credentials?", protocol: "HTTP", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/s3` },
  { api: "Bun.s3", category: "Databases", topic: "S3 Storage", type: "const \u2192 S3Client", params: "", protocol: "HTTP", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/s3` },
  { api: "Bun.postgres", category: "Databases", topic: "PostgreSQL Client", type: "const \u2192 SQL (tagged template)", params: "template literal / url", protocol: "TCP", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/sql` },
  { api: "Bun.SQL", category: "Databases", topic: "PostgreSQL Client", type: "class", params: "url?, options?", protocol: "TCP", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/sql` },
  { api: "Bun.RedisClient", category: "Databases", topic: "Redis (Valkey) Client", type: "class", params: "url?, options?", protocol: "TCP", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/redis` },

  // ── Compression ──
  { api: "Bun.gzipSync", category: "Compression", topic: "Compression", type: "function \u2192 Uint8Array", params: "data, options?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.gunzipSync", category: "Compression", topic: "Compression", type: "function \u2192 Uint8Array", params: "data, options?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.deflateSync", category: "Compression", topic: "Compression", type: "function \u2192 Uint8Array", params: "data, options?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.inflateSync", category: "Compression", topic: "Compression", type: "function \u2192 Uint8Array", params: "data, options?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.zstdCompressSync", category: "Compression", topic: "Compression", type: "function \u2192 Uint8Array", params: "data", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.zstdDecompressSync", category: "Compression", topic: "Compression", type: "function \u2192 Uint8Array", params: "data", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.zstdCompress", category: "Compression", topic: "Compression", type: "function \u2192 Promise<Uint8Array>", params: "data", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.zstdDecompress", category: "Compression", topic: "Compression", type: "function \u2192 Promise<Uint8Array>", params: "data", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/compression` },
  { api: "Bun.Archive", category: "Compression", topic: "Compression", type: "class", params: "", protocol: "", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/utils` },

  // ── Utilities ──
  { api: "Bun.version", category: "Utilities", topic: "Utilities", type: "const \u2192 string", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.version_with_sha", category: "Utilities", topic: "Utilities", type: "const \u2192 string", params: "", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.revision", category: "Utilities", topic: "Utilities", type: "const \u2192 string", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.env", category: "Utilities", topic: "Utilities", type: "const \u2192 Env", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.main", category: "Utilities", topic: "Utilities", type: "const \u2192 string", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.cwd", category: "Utilities", topic: "System & Environment", type: "function \u2192 string", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.origin", category: "Utilities", topic: "System & Environment", type: "const \u2192 string", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.argv", category: "Utilities", topic: "Utilities", type: "const \u2192 string[]", params: "", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.isMainThread", category: "Utilities", topic: "System & Environment", type: "const \u2192 boolean", params: "", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.enableANSIColors", category: "Utilities", topic: "System & Environment", type: "const \u2192 boolean", params: "", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.embeddedFiles", category: "Utilities", topic: "Utilities", type: "const \u2192 ReadonlyArray<Blob>", params: "", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.sleep", category: "Utilities", topic: "Sleep & Timing", type: "function \u2192 Promise<void>", params: "ms", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.sleepSync", category: "Utilities", topic: "Sleep & Timing", type: "function \u2192 void", params: "ms", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.nanoseconds", category: "Utilities", topic: "Sleep & Timing", type: "function \u2192 number", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.randomUUIDv7", category: "Utilities", topic: "Random & UUID", type: "function \u2192 string | Buffer", params: "encoding?: 'hex' | 'base64' | 'base64url' | 'buffer', timestamp?", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.randomUUIDv5", category: "Utilities", topic: "Random & UUID", type: "function \u2192 string", params: "name, namespace", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.which", category: "Utilities", topic: "System & Environment", type: "function \u2192 string | null", params: "cmd, options?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.openInEditor", category: "Utilities", topic: "System & Environment", type: "function \u2192 void", params: "path, options?", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.peek", category: "Utilities", topic: "Comparison & Inspection", type: "function \u2192 T | Promise<T>", params: "promise", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.deepEquals", category: "Utilities", topic: "Comparison & Inspection", type: "function \u2192 boolean", params: "a, b, strict?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.deepMatch", category: "Utilities", topic: "Comparison & Inspection", type: "function \u2192 boolean", params: "subset, a", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.inspect", category: "Utilities", topic: "Comparison & Inspection", type: "function \u2192 string", params: "value, options?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.inspect.table", category: "Utilities", topic: "Comparison & Inspection", type: "function \u2192 string", params: "data, columns?, options?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.escapeHTML", category: "Utilities", topic: "String & Text Processing", type: "function \u2192 string", params: "input: string | number | boolean | object", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.stringWidth", category: "Utilities", topic: "String & Text Processing", type: "function \u2192 number", params: "string", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.indexOfLine", category: "Utilities", topic: "String & Text Processing", type: "function \u2192 number", params: "string, offset?", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.stripANSI", category: "Utilities", topic: "String & Text Processing", type: "function \u2192 string", params: "string", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.wrapAnsi", category: "Utilities", topic: "String & Text Processing", type: "function \u2192 string", params: "string, width, options?", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.resolveSync", category: "Utilities", topic: "Module Resolution", type: "function \u2192 string", params: "specifier, parent", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.resolve", category: "Utilities", topic: "Module Resolution", type: "function \u2192 Promise<string>", params: "specifier, parent", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.fileURLToPath", category: "Utilities", topic: "URL & Path Utilities", type: "function \u2192 string", params: "url: string | URL", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.pathToFileURL", category: "Utilities", topic: "URL & Path Utilities", type: "function \u2192 URL", params: "path", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.allocUnsafe", category: "Utilities", topic: "Memory & Buffer Management", type: "function \u2192 Uint8Array", params: "size", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.concatArrayBuffers", category: "Utilities", topic: "Memory & Buffer Management", type: "function \u2192 ArrayBuffer | Uint8Array", params: "buffers, maxLength?, asUint8Array?", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.shrink", category: "Utilities", topic: "Memory & Buffer Management", type: "function \u2192 void", params: "buffer", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.ArrayBufferSink", category: "Utilities", topic: "Memory & Buffer Management", type: "class", params: "", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.Glob", category: "Utilities", topic: "Glob", type: "class", params: "pattern", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/glob` },
  { api: "Bun.TOML.parse", category: "Utilities", topic: "Parsing & Formatting", type: "function \u2192 object", params: "string", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.markdown", category: "Utilities", topic: "Parsing & Formatting", type: "function \u2192 string | ReactElement", params: "string, {gfm?, wikiLinks?, latexMath?, headingIds?, renderer?}", protocol: "", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.color", category: "Utilities", topic: "Parsing & Formatting", type: "function \u2192 string | [r,g,b] | number | null", params: "input: ColorInput, outputFormat?", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.JSONC", category: "Utilities", topic: "Parsing & Formatting", type: "const \u2192 {parse}", params: "string, reviver?", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.JSON5", category: "Utilities", topic: "Parsing & Formatting", type: "const \u2192 {parse}", params: "string, reviver?", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.JSONL", category: "Utilities", topic: "Parsing & Formatting", type: "const \u2192 {parse}", params: "string", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.YAML", category: "Utilities", topic: "Parsing & Formatting", type: "const \u2192 {parse, stringify}", params: "string, options?", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.Cookie", category: "Utilities", topic: "Cookies", type: "class", params: "name, value, options?", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/cookies` },
  { api: "Bun.CookieMap", category: "Utilities", topic: "Cookies", type: "class", params: "entries?", protocol: "", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/cookies` },

  // ── Streaming ──
  { api: "HTMLRewriter", category: "Streaming", topic: "Streaming HTML", type: "class", params: "", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/html-rewriter` },
  { api: "Bun.readableStreamToText", category: "Streaming", topic: "Stream Processing", type: "function \u2192 Promise<string>", params: "stream", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },
  { api: "Bun.readableStreamToJSON", category: "Streaming", topic: "Stream Processing", type: "function \u2192 Promise<any>", params: "stream", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },
  { api: "Bun.readableStreamToArray", category: "Streaming", topic: "Stream Processing", type: "function \u2192 Promise<any[]>", params: "stream", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },
  { api: "Bun.readableStreamToArrayBuffer", category: "Streaming", topic: "Stream Processing", type: "function \u2192 Promise<ArrayBuffer>", params: "stream", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },
  { api: "Bun.readableStreamToBytes", category: "Streaming", topic: "Stream Processing", type: "function \u2192 Promise<Uint8Array>", params: "stream", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },
  { api: "Bun.readableStreamToBlob", category: "Streaming", topic: "Stream Processing", type: "function \u2192 Promise<Blob>", params: "stream", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },
  { api: "Bun.readableStreamToFormData", category: "Streaming", topic: "Stream Processing", type: "function \u2192 Promise<FormData>", params: "stream, boundary?", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },
  { api: "FormData.from", category: "Streaming", topic: "Stream Processing", type: "function \u2192 FormData", params: "body: ArrayBuffer | string | URLSearchParams", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/streams` },

  // ── Advanced ──
  { api: "bun:ffi", category: "Advanced", topic: "FFI", type: "module", params: "{symbols}", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/ffi` },
  { api: "Bun.FFI.CString", category: "Advanced", topic: "FFI", type: "class \u2192 CString", params: "ptr: number | bigint, byteOffset?, byteLength?", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/ffi` },
  { api: "Bun.FFI.linkSymbols", category: "Advanced", topic: "FFI", type: "function \u2192 Record<string, Function>", params: "{...symbolDefs: {args, returns, ptr}}", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/ffi` },
  { api: "bun:test", category: "Advanced", topic: "Testing", type: "module", params: "", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/runtime/bun-apis` },
  { api: "Bun.jest", category: "Advanced", topic: "Testing", type: "function \u2192 typeof expect", params: "path", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/runtime/bun-apis` },
  { api: "Bun.registerMacro", category: "Advanced", topic: "Low-level / Internals", type: "function \u2192 void", params: "specifier, macroFn", protocol: "", status: "new", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Worker", category: "Advanced", topic: "Workers", type: "class", params: "url, options?", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/workers` },
  { api: "Bun.gc", category: "Advanced", topic: "Low-level / Internals", type: "function \u2192 void", params: "force?: boolean", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.generateHeapSnapshot", category: "Advanced", topic: "Low-level / Internals", type: "function \u2192 HeapSnapshot | string", params: "format?: 'jsc' | 'v8'", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "bun:jsc", category: "Advanced", topic: "Low-level / Internals", type: "module", params: "", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/jsc` },
  { api: "Node-API", category: "Advanced", topic: "Node-API", type: "module", params: "", protocol: "", status: "stable", surface: 3, docUrl: `${BUN_DOC_BASE}/api/node-api` },
  { api: "import.meta", category: "Advanced", topic: "import.meta", type: "object", params: "", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/runtime/bun-apis` },
  { api: "Bun.Terminal", category: "Advanced", topic: "Low-level / Internals", type: "class \u2192 Terminal & AsyncDisposable", params: "cmd, {cols?, rows?, name?, data?, exit?, drain?}", protocol: "", status: "new", surface: 3, docUrl: `${BUN_DOC_BASE}/api/utils` },
  { api: "Bun.unsafe", category: "Advanced", topic: "Low-level / Internals", type: "const \u2192 {arrayBufferToPtr, gcAggressivelyOnNextTick, ...}", params: "", protocol: "", status: "new", surface: 2, docUrl: `${BUN_DOC_BASE}/api/utils` },

  // ── Semver ──
  { api: "Bun.semver", category: "Semver", topic: "Parsing & Formatting", type: "namespace", params: "a, op, b", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/semver` },

  // ── Routing ──
  { api: "URLPattern", category: "Routing", topic: "URL Pattern Matching", type: "class", params: "init: URLPatternInit | string", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/urlpattern` },
  { api: "URLPattern.test", category: "Routing", topic: "URL Pattern Matching", type: "method \u2192 boolean", params: "input: string | URL", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/urlpattern` },
  { api: "URLPattern.exec", category: "Routing", topic: "URL Pattern Matching", type: "method \u2192 URLPatternResult | null", params: "input: string | URL", protocol: "", status: "stable", surface: 2, docUrl: `${BUN_DOC_BASE}/api/urlpattern` },
  { api: "URLPattern.hasRegExpGroups", category: "Routing", topic: "URL Pattern Matching", type: "getter \u2192 boolean", params: "", protocol: "", status: "stable", surface: 1, docUrl: `${BUN_DOC_BASE}/api/urlpattern` },
] as const;

export const BUN_SCANNER_APIS: ReadonlySet<string> = new Set([
  "Bun.spawn",
  "Bun.spawnSync",
  "Bun.file",
  "Bun.write",
  "Bun.hash",
  "Bun.semver",
  "Bun.env",
  "Bun.version",
  "Bun.inspect",
  "Bun.inspect.table",
  "Bun.stringWidth",
  "Bun.nanoseconds",
  "Bun.Glob",
  "Bun.dns.getCacheStats",
  "bun:test",
  "import.meta",
]);

export function formatDocUrl(url: string, maxLen?: number): string {
  const limit = maxLen ?? 48;
  if (url.length <= limit) return url;
  return url.slice(0, limit - 1) + "\u2026";
}

export function filterByCategory(
  catalog: readonly BunApiEntry[],
  category: BunApiCategory,
): BunApiEntry[] {
  return catalog.filter((entry) => entry.category === category);
}

export function filterByTopic(
  catalog: readonly BunApiEntry[],
  topic: string,
): BunApiEntry[] {
  return catalog.filter((entry) => entry.topic === topic);
}

export function apiCount(): number {
  return BUN_API_CATALOG.length;
}

export class BunApiMatrixRenderer {
  render(options?: { category?: BunApiCategory; topic?: string }): void {
    let entries: readonly BunApiEntry[] = BUN_API_CATALOG;
    if (options?.category) {
      entries = filterByCategory(entries, options.category);
    }
    if (options?.topic) {
      entries = filterByTopic(entries, options.topic);
    }

    const rows = entries.map((entry) => ({
      API: entry.api,
      Topic: entry.topic,
      Type: entry.type,
      Params: entry.params || "-",
      Protocol: entry.protocol || "-",
      Status: renderStatus(entry.status),
      Surface: renderSurface(entry.surface),
      Scanner: renderScanner(BUN_SCANNER_APIS.has(entry.api)),
      "Doc URL": formatDocUrl(entry.docUrl),
    }));

    const columns = ["API", "Topic", "Type", "Params", "Protocol", "Status", "Surface", "Scanner", "Doc URL"];
    // @ts-expect-error Bun.inspect.table accepts options as third arg
    console.log(Bun.inspect.table(rows, columns, { colors: true }));
  }
}
