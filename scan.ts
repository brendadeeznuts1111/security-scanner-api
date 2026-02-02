#!/usr/bin/env bun

import { parseArgs } from "node:util";
import { readdir } from "node:fs/promises";
import { availableParallelism } from "node:os";

// ── CLI flags ──────────────────────────────────────────────────────────
const { values: flags, positionals } = parseArgs({
  allowPositionals: true,
  args: Bun.argv.slice(2),
  options: {
    help:         { type: "boolean", short: "h", default: false },
    detail:       { type: "boolean", default: false },
    inspect:      { type: "string" },
    sort:         { type: "string" },
    filter:       { type: "string" },
    json:         { type: "boolean", default: false },
    "with-bunfig":  { type: "boolean", default: false },
    workspaces:   { type: "boolean", default: false },
    "without-pkg":  { type: "boolean", default: false },
    audit:        { type: "boolean", default: false },
    fix:          { type: "boolean", default: false },
    "dry-run":    { type: "boolean", default: false },
    why:          { type: "string" },
    outdated:     { type: "boolean", default: false },
    update:       { type: "boolean", default: false },
    "fix-engine":   { type: "boolean", default: false },
    info:         { type: "string" },
    "fix-registry":  { type: "string" },
    "pm-view":    { type: "string" },
    path:         { type: "boolean", default: false },
    "fix-scopes": { type: "string" },
    "fix-npmrc":  { type: "string" },
    "fix-trusted": { type: "boolean", default: false },
    "fix-env-docs": { type: "boolean", default: false },
    "no-ipc":     { type: "boolean", default: false },
    patch:        { type: "boolean", default: false },
    minor:        { type: "boolean", default: false },
    verify:       { type: "boolean", default: false },
    top:          { type: "boolean", default: false },
    depth:        { type: "string" },
    production:   { type: "boolean", short: "p", default: false },
    omit:         { type: "string" },
    global:       { type: "boolean", short: "g", default: false },
    catalog:      { type: "boolean", short: "r", default: false },
    wf:           { type: "string", multiple: true },
    snapshot:     { type: "boolean", default: false },
    compare:      { type: "boolean", default: false },
    "audit-compare": { type: "string" },
    "no-auto-snapshot": { type: "boolean", default: false },
  },
  strict: true,
});

// ── ANSI helpers ───────────────────────────────────────────────────────
const c = {
  bold:    (s: string) => `\x1b[1m${s}\x1b[0m`,
  cyan:    (s: string) => `\x1b[36m${s}\x1b[0m`,
  green:   (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow:  (s: string) => `\x1b[33m${s}\x1b[0m`,
  dim:     (s: string) => `\x1b[2m${s}\x1b[0m`,
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
  red:     (s: string) => `\x1b[31m${s}\x1b[0m`,
};

/** Extract the first meaningful error line from bun stderr, skipping .env diagnostics and version banners. */
function extractBunError(stderr: string, fallback: string): string {
  for (const line of stderr.trim().split("\n")) {
    const clean = stripAnsi(line).trim();
    if (!clean) continue;
    if (clean.startsWith('".env')) continue;       // .env auto-load diagnostic
    if (clean.startsWith("bun add")) continue;     // version banner
    if (clean.startsWith("bun update")) continue;  // version banner
    if (clean.startsWith("bun install")) continue; // version banner
    return clean;
  }
  return fallback;
}

// ── Feature flag helpers ──────────────────────────────────────────────

/** Returns true only for "1" or "true" — matches Bun's feature flag semantics. */
export function isFeatureFlagActive(val: string | undefined): boolean {
  return val === "1" || val === "true";
}

/** Classify a DISABLE_ or SKIP_ env var for audit display. */
export function classifyEnvFlag(val: string | undefined, offLabel: string): { label: string; state: "active" | "inactive" | "ambiguous" } {
  if (!val)                         return { label: offLabel,     state: "inactive" };
  if (val === "1" || val === "true") return { label: "OFF",        state: "active" };
  return                                    { label: `set (${val})`, state: "ambiguous" };
}

/** Compute effective linker strategy from explicit bunfig, configVersion, and workspace. */
export function effectiveLinker(opts: { linker: string; configVersion: number; workspace: boolean }): { strategy: string; source: string } {
  if (opts.linker !== "-") return { strategy: opts.linker, source: "bunfig" };
  if (opts.configVersion === 1) {
    return opts.workspace
      ? { strategy: "isolated", source: "configVersion=1 + workspace" }
      : { strategy: "hoisted",  source: "configVersion=1" };
  }
  if (opts.configVersion === 0) return { strategy: "hoisted", source: "configVersion=0 (compat)" };
  return { strategy: "hoisted", source: "default" };
}

/** Normalize git remote / package.json repository to a clean GitHub URL. */
function normalizeGitUrl(raw: string): string {
  let url = raw.trim();
  // git+https://github.com/user/repo.git → https://...
  url = url.replace(/^git\+/, "");
  // git@github.com:user/repo.git or git@github.com-personal:user/repo.git
  url = url.replace(/^git@github\.com[^:]*:/, "https://github.com/");
  // https://user@github.com/... → https://github.com/...
  url = url.replace(/^https?:\/\/[^@]+@github\.com/, "https://github.com");
  // strip trailing .git
  url = url.replace(/\.git$/, "");
  return url || "-";
}

/** Extract host and owner from a normalized repo URL. */
function parseRepoMeta(url: string): { host: string; owner: string } {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    return { host: u.host, owner: parts[0] ?? "-" };
  } catch {
    return { host: "-", owner: "-" };
  }
}

/** Platform-aware CLI invocation command and optional PowerShell hint. */
export function platformHelp(platform: string): { cmd: string; hint: string | null } {
  if (platform === "win32") {
    return {
      cmd: "mise.exe exec -- bun",
      hint: "If using mise, call 'mise.exe' directly to ensure arguments like '--' are passed correctly to the runtime.",
    };
  }
  return { cmd: "bun", hint: null };
}

/** Whether to show the mise.exe startup hint (win32 without MISE_SHELL set). */
export function shouldWarnMise(platform: string, miseShell: string | undefined): boolean {
  return platform === "win32" && !miseShell;
}

// ── Semver helpers ────────────────────────────────────────────────────
type SemVer = { major: number; minor: number; patch: number };

function parseSemver(v: string): SemVer | null {
  const m = v.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3] };
}

/** Classify the bump from `a` → `b`. Returns null if versions can't be parsed. */
function semverBumpType(a: string, b: string): "patch" | "minor" | "major" | null {
  const va = parseSemver(a);
  const vb = parseSemver(b);
  if (!va || !vb) return null;
  if (va.major !== vb.major) return "major";
  if (va.minor !== vb.minor) return "minor";
  if (va.patch !== vb.patch) return "patch";
  return null; // same version
}

// ── Shared outdated parsing ───────────────────────────────────────────
const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

type OutdatedPkg = { name: string; depType: string; current: string; update: string; latest: string; workspace?: string };

function parseBunOutdated(output: string): OutdatedPkg[] {
  const pkgs: OutdatedPkg[] = [];
  for (const line of output.split("\n")) {
    const clean = stripAnsi(line);
    if (!clean.startsWith("│")) continue;
    const cols = clean.split("│").map((c) => c.trim()).filter(Boolean);
    if (cols.length >= 4 && cols[0] !== "Package") {
      const nameMatch = cols[0].match(/^(.+?)\s*\((\w+)\)\s*$/);
      const name = nameMatch ? nameMatch[1] : cols[0];
      const depType = nameMatch ? nameMatch[2] : "prod";
      const workspace = cols.length >= 5 ? cols[4] : undefined;
      pkgs.push({ name, depType, current: cols[1], update: cols[2], latest: cols[3], workspace });
    }
  }
  return pkgs;
}

// ── Types ──────────────────────────────────────────────────────────────
export interface ProjectInfo {
  folder: string;
  name: string;
  version: string;
  deps: number;
  devDeps: number;
  totalDeps: number;
  engine: string;
  lock: string;
  bunfig: boolean;
  workspace: boolean;
  keyDeps: string[];
  // detail-mode extras
  author: string;
  license: string;
  description: string;
  scriptsCount: number;
  bin: string[];
  registry: string;
  authReady: boolean;
  hasNpmrc: boolean;
  hasBinDir: boolean;
  scopes: string[];
  resilient: boolean;
  hasPkg: boolean;
  // bunfig [install] settings
  frozenLockfile: boolean;
  production: boolean;
  exact: boolean;
  linker: string;               // "hoisted" | "isolated" | "-"
  configVersion: number;        // lockfile configVersion: 0 | 1 | -1 (unknown/binary)
  backend: string;              // "clonefile" | "hardlink" | "symlink" | "copyfile" | "-"
  minimumReleaseAge: number;    // 0 = not set, else seconds
  saveTextLockfile: boolean;
  cacheDisabled: boolean;
  cacheDir: string;             // "-" = not set
  securityScanner: string;      // "-" = not set
  linkWorkspacePackages: boolean;
  noVerify: boolean;            // skip integrity verification
  verbose: boolean;             // debug logging
  silent: boolean;              // no logging
  concurrentScripts: number;    // 0 = not set, default cpu×2
  networkConcurrency: number;   // 0 = not set, default 48
  targetCpu: string;            // cross-platform override: arm64, x64, etc. | "-"
  targetOs: string;             // cross-platform override: linux, darwin, win32, etc. | "-"
  overrides: string[];          // package.json "overrides" keys (npm-style)
  resolutions: string[];        // package.json "resolutions" keys (yarn-style)
  trustedDeps: string[];         // lifecycle-script-allowed packages
  repo: string;                  // GitHub URL (normalized) | "-"
  repoSource: string;            // "pkg" | "git" | "-"
  repoOwner: string;             // GitHub username or org | "-"
  repoHost: string;              // "github.com" etc. | "-"
  envFiles: string[];             // .env files found (.env, .env.local, .env.production, etc.)
  bunfigEnvRefs: string[];        // $VAR / ${VAR} references in bunfig.toml
}

// ── Accepted bun install --cpu / --os values ──────────────────────────
const VALID_CPU = new Set(["arm64", "x64", "ia32", "ppc64", "s390x"]);
const VALID_OS  = new Set(["linux", "darwin", "win32", "freebsd", "openbsd", "sunos", "aix"]);

// ── Notable dependency names to flag ───────────────────────────────────
const NOTABLE = new Set([
  "elysia", "hono", "express", "fastify", "koa",
  "react", "next", "vue", "svelte", "solid-js", "astro",
  "typescript", "zod", "drizzle-orm", "prisma", "@prisma/client",
  "tailwindcss", "vite", "webpack", "eslint", "prettier",
  "bun-types", "@anthropic-ai/sdk", "openai", "discord.js",
  "@modelcontextprotocol/sdk",
]);

/** Bun's built-in default trusted dependencies (bun 1.2.x).
 *  Source: github.com/oven-sh/bun/blob/main/src/install/default-trusted-dependencies.txt */
const BUN_DEFAULT_TRUSTED = new Set([
  "@airbnb/node-memwatch", "@apollo/protobufjs", "@apollo/rover", "@appsignal/nodejs",
  "@arkweid/lefthook", "@aws-amplify/cli", "@bahmutov/add-typescript-to-cypress",
  "@bazel/concatjs", "@bazel/cypress", "@bazel/esbuild", "@bazel/hide-bazel-files",
  "@bazel/jasmine", "@bazel/protractor", "@bazel/rollup", "@bazel/terser", "@bazel/typescript",
  "@bufbuild/buf", "@cdktf/node-pty-prebuilt-multiarch", "@ckeditor/ckeditor5-vue",
  "@cloudflare/wrangler", "@contrast/fn-inspect", "@cubejs-backend/cubestore",
  "@cubejs-backend/native", "@cypress/snapshot", "@danmarshall/deckgl-typings",
  "@datadog/mobile-react-native", "@discordjs/opus", "@eversdk/lib-node",
  "@evilmartians/lefthook", "@ffmpeg-installer/darwin-arm64", "@ffmpeg-installer/darwin-x64",
  "@ffmpeg-installer/linux-arm", "@ffmpeg-installer/linux-arm64", "@ffmpeg-installer/linux-ia32",
  "@ffmpeg-installer/linux-x64", "@ffprobe-installer/darwin-arm64", "@ffprobe-installer/darwin-x64",
  "@ffprobe-installer/linux-arm", "@ffprobe-installer/linux-arm64", "@ffprobe-installer/linux-ia32",
  "@ffprobe-installer/linux-x64", "@fingerprintjs/fingerprintjs-pro-react", "@ghaiklor/x509",
  "@go-task/cli", "@injectivelabs/sdk-ts", "@instana/autoprofile", "@intlify/vue-i18n-bridge",
  "@intlify/vue-router-bridge", "@matteodisabatino/gc_info", "@memlab/cli",
  "@microsoft.azure/autorest-core", "@microsoft/teamsfx-cli", "@microsoft/ts-command-line",
  "@napi-rs/pinyin", "@nativescript/core", "@netlify/esbuild", "@newrelic/native-metrics",
  "@notarize/qlc-cli", "@nx-dotnet/core", "@opensearch-project/oui",
  "@pact-foundation/pact-node", "@paloaltonetworks/postman-code-generators", "@pdftron/pdfnet-node",
  "@percy/core", "@pnpm/exe", "@prisma/client", "@prisma/engines", "@progress/kendo-licensing",
  "@pulumi/aws-native", "@pulumi/awsx", "@pulumi/command", "@pulumi/kubernetes", "@railway/cli",
  "@replayio/cypress", "@replayio/playwright", "@roots/bud-framework", "@sap/hana-client",
  "@sap/hana-performance-tools", "@sap/hana-theme-vscode", "@scarf/scarf", "@sematext/gc-stats",
  "@sentry/capacitor", "@sentry/profiling-node", "@serialport/bindings", "@serialport/bindings-cpp",
  "@shopify/ngrok", "@shopify/plugin-cloudflare", "@sitespeed.io/chromedriver",
  "@sitespeed.io/edgedriver", "@softvisio/core", "@splunk/otel", "@strapi/strapi", "@sveltejs/kit",
  "@syncfusion/ej2-angular-base", "@taquito/taquito", "@temporalio/core-bridge",
  "@tensorflow/tfjs-node", "@trufflesuite/bigint-buffer", "@typescript-tools/rust-implementation",
  "@vaadin/vaadin-usage-statistics", "@vscode/ripgrep", "@vscode/sqlite3",
  "abstract-socket", "admin-lte", "appdynamics", "appium-chromedriver", "appium-windows-driver",
  "applicationinsights-native-metrics", "argon2", "autorest", "aws-crt",
  "azure-functions-core-tools", "azure-streamanalytics-cicd", "backport", "bcrypt",
  "better-sqlite3", "bigint-buffer", "blake-hash", "bs-platform", "bufferutil", "bun", "canvacord",
  "canvas", "cbor-extract", "chromedriver", "chromium", "classic-level", "cld", "cldr-data",
  "clevertap-react-native", "clientjs", "cmark-gfm", "compresion", "contentlayer", "contextify",
  "cordova.plugins.diagnostic", "couchbase", "cpu-features", "cwebp-bin", "cy2", "cypress",
  "dd-trace", "deasync", "detox", "detox-recorder", "diskusage", "dotnet-2.0.0", "dprint",
  "drivelist", "dtrace-provider", "duckdb", "dugite", "eccrypto", "egg-bin", "egg-ci", "electron",
  "electron-chromedriver", "electron-prebuilt", "electron-winstaller", "elm", "elm-format",
  "esbuild", "esoftplay", "event-loop-stats", "exifreader", "farmhash", "fast-folder-size",
  "faunadb", "ffi", "ffi-napi", "ffmpeg-static", "fibers", "fmerge", "free-email-domains",
  "fs-xattr", "full-icu", "gatsby", "gc-stats", "gcstats.js", "geckodriver", "gentype", "ghooks",
  "gif2webp-bin", "gifsicle", "git-commit-msg-linter", "git-validate", "git-win", "gl", "go-ios",
  "grpc", "grpc-tools", "handbrake-js", "hasura-cli", "heapdump", "hiredis", "hnswlib-node",
  "hugo-bin", "hummus", "ibm_db", "iconv", "iedriver", "iltorb", "incremental-json-parser",
  "install-peers", "interruptor", "iobroker.js-controller", "iso-constants", "isolated-vm", "java",
  "jest-preview", "jpeg-recompress-bin", "jpegtran-bin", "keccak", "kerberos", "keytar", "lefthook",
  "leveldown", "libpg-query", "libpq", "libxmljs", "libxmljs2", "lightningcss-cli", "lint", "lmdb",
  "lmdb-store", "local-cypress", "lz4", "lzma-native", "lzo", "macos-alias", "mbt", "memlab",
  "microtime", "minidump", "mmmagic", "modern-syslog", "mongodb-client-encryption",
  "mongodb-crypt-library-dummy", "mongodb-crypt-library-version", "mongodb-memory-server", "mozjpeg",
  "ms-chromium-edge-driver", "msgpackr-extract", "msnodesqlv8", "msw", "muhammara", "netlify-cli",
  "ngrok", "ngx-popperjs", "nice-napi", "node", "node-expat", "node-hid", "node-jq",
  "node-libcurl", "node-mac-contacts", "node-pty", "node-rdkafka", "node-sass",
  "node-webcrypto-ossl", "node-zopfli", "node-zopfli-es", "nodegit", "nodejieba", "nodent-runtime",
  "nx", "odiff-bin", "oniguruma", "opencode-ai", "optipng-bin", "oracledb", "os-dns-native",
  "parse-server", "phantomjs", "phantomjs-prebuilt", "pkcs11js", "playwright-chromium",
  "playwright-firefox", "playwright-webkit", "pngout-bin", "pngquant-bin", "posix", "pprof",
  "pre-commit", "pre-push", "prisma", "protoc", "protoc-gen-grpc-web", "puppeteer", "purescript",
  "re2", "react-jsx-parser", "react-native-stylex", "react-particles", "react-tsparticles",
  "react-vertical-timeline-component", "realm", "redis-memory-server", "ref", "ref-napi",
  "registry-js", "robotjs", "sauce-connect-launcher", "saucectl", "secp256k1", "segfault-handler",
  "shared-git-hooks", "sharp", "simple-git-hooks", "sleep", "slice2js", "snyk", "sockopt",
  "sodium-native", "sonar-scanner", "spago", "spectron", "spellchecker", "sq-native", "sqlite3",
  "sse4_crc32", "ssh2", "storage-engine", "subrequests", "subrequests-express",
  "subrequests-json-merger", "supabase", "svf-lib", "swagger-ui", "swiftlint", "taiko", "tldjs",
  "tree-sitter", "tree-sitter-cli", "tree-sitter-json", "tree-sitter-kotlin",
  "tree-sitter-typescript", "tree-sitter-yaml", "truffle", "tsparticles-engine", "ttag-cli",
  "ttf2woff2", "typemoq", "unix-dgram", "ursa-optional", "usb", "utf-8-validate",
  "v8-profiler-next", "vue-demi", "vue-echarts", "vue-inbrowser-compiler-demi", "wd", "wdeasync",
  "weak-napi", "webdev-toolkit", "windows-build-tools", "wix-style-react", "wordpos", "workerd",
  "wrtc", "xxhash", "yo", "yorkie", "zeromq", "zlib-sync", "zopflipng-bin",
]);

const PROJECTS_ROOT = Bun.env.BUN_PLATFORM_HOME ?? "/Users/nolarose/Projects";

// ── Xref types ────────────────────────────────────────────────────────
type XrefEntry = { folder: string; bunDefault: string[]; explicit: string[]; blocked: string[] };

interface XrefSnapshot {
  timestamp: string;
  projects: XrefEntry[];
  totalBunDefault: number;
  totalProjects: number;
}

const SNAPSHOT_DIR = `${import.meta.dir}/.audit`;
const SNAPSHOT_PATH = `${SNAPSHOT_DIR}/xref-snapshot.json`;

async function saveXrefSnapshot(data: XrefEntry[], totalProjects: number): Promise<void> {
  const { mkdir } = await import("node:fs/promises");
  await mkdir(SNAPSHOT_DIR, { recursive: true });
  const snapshot: XrefSnapshot = {
    timestamp: new Date().toISOString(),
    projects: data,
    totalBunDefault: data.reduce((s, x) => s + x.bunDefault.length, 0),
    totalProjects,
  };
  await Bun.write(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2) + "\n");
}

async function loadXrefSnapshot(path?: string): Promise<XrefSnapshot | null> {
  const file = Bun.file(path ?? SNAPSHOT_PATH);
  if (!(await file.exists())) return null;
  try {
    return JSON.parse(await file.text()) as XrefSnapshot;
  } catch {
    return null;
  }
}

const XREF_HOOKS = ["preinstall", "postinstall", "preuninstall", "prepare", "preprepare", "postprepare", "prepublishOnly"] as const;

async function scanXrefData(projects: ProjectInfo[]): Promise<XrefEntry[]> {
  const result: XrefEntry[] = [];
  for (const p of projects) {
    if (!p.hasPkg) continue;
    const nmDir = `${PROJECTS_ROOT}/${p.folder}/node_modules`;
    let entries: string[] = [];
    try { entries = await readdir(nmDir); } catch { continue; }
    const trusted = new Set(p.trustedDeps);
    const xref: XrefEntry = { folder: p.folder, bunDefault: [], explicit: [], blocked: [] };
    const seen = new Set<string>();
    const classify = (pkgName: string, scripts: Record<string, string>) => {
      let hasAnyHook = false;
      for (const h of XREF_HOOKS) { if (scripts[h]) { hasAnyHook = true; break; } }
      if (hasAnyHook && !seen.has(pkgName)) {
        seen.add(pkgName);
        if (BUN_DEFAULT_TRUSTED.has(pkgName)) xref.bunDefault.push(pkgName);
        else if (trusted.has(pkgName)) xref.explicit.push(pkgName);
        else xref.blocked.push(pkgName);
      }
    };
    for (const entry of entries) {
      if (entry.startsWith("@")) {
        let scoped: string[] = [];
        try { scoped = await readdir(`${nmDir}/${entry}`); } catch { continue; }
        for (const sub of scoped) {
          try {
            const pkg = JSON.parse(await Bun.file(`${nmDir}/${entry}/${sub}/package.json`).text());
            if (pkg.scripts) classify(`${entry}/${sub}`, pkg.scripts);
          } catch { /* skip */ }
        }
      } else {
        try {
          const pkg = JSON.parse(await Bun.file(`${nmDir}/${entry}/package.json`).text());
          if (pkg.scripts) classify(entry, pkg.scripts);
        } catch { /* skip */ }
      }
    }
    if (xref.bunDefault.length + xref.explicit.length + xref.blocked.length > 0) {
      result.push(xref);
    }
  }
  return result;
}

// ── Default metadata for --fix ─────────────────────────────────────────
const DEFAULTS = {
  author: "mike.hunt@factory.wager.com",
  license: "MIT",
};

const AUDIT_FIELDS = ["author", "license", "description", "version", "engine"] as const;
type AuditField = (typeof AUDIT_FIELDS)[number];

// ── Scan a single project directory ────────────────────────────────────
export async function scanProject(dir: string): Promise<ProjectInfo> {
  const folder = dir.split("/").pop()!;
  const base: ProjectInfo = {
    folder,
    name: folder,
    version: "-",
    deps: 0,
    devDeps: 0,
    totalDeps: 0,
    engine: "-",
    lock: "none",
    bunfig: false,
    workspace: false,
    keyDeps: [],
    author: "-",
    license: "-",
    description: "-",
    scriptsCount: 0,
    bin: [],
    registry: "-",
    authReady: false,
    hasNpmrc: false,
    hasBinDir: false,
    scopes: [],
    resilient: false,
    hasPkg: false,
    frozenLockfile: false,
    production: false,
    exact: false,
    linker: "-",
    configVersion: -1,
    backend: "-",
    minimumReleaseAge: 0,
    saveTextLockfile: false,
    cacheDisabled: false,
    cacheDir: "-",
    securityScanner: "-",
    linkWorkspacePackages: false,
    noVerify: false,
    verbose: false,
    silent: false,
    concurrentScripts: 0,
    networkConcurrency: 0,
    targetCpu: "-",
    targetOs: "-",
    overrides: [],
    resolutions: [],
    trustedDeps: [],
    repo: "-",
    repoSource: "-",
    repoOwner: "-",
    repoHost: "-",
    envFiles: [],
    bunfigEnvRefs: [],
  };

  // package.json
  const pkgFile = Bun.file(`${dir}/package.json`);
  if (await pkgFile.exists()) {
    try {
      const pkg = await pkgFile.json();
      base.hasPkg = true;
      base.name = pkg.name ?? folder;
      base.version = pkg.version ?? "-";

      const depsObj = pkg.dependencies ?? {};
      const devObj = pkg.devDependencies ?? {};
      base.deps = Object.keys(depsObj).length;
      base.devDeps = Object.keys(devObj).length;
      base.totalDeps = base.deps + base.devDeps;

      base.engine = pkg.engines?.bun ?? "-";
      base.workspace = Array.isArray(pkg.workspaces) || typeof pkg.workspaces === "object" && pkg.workspaces !== null;
      base.author = typeof pkg.author === "string" ? pkg.author : pkg.author?.name ?? "-";
      base.license = pkg.license ?? "-";
      base.description = pkg.description ?? "-";
      base.scriptsCount = pkg.scripts ? Object.keys(pkg.scripts).length : 0;

      // bin field: string → single name, object → keys
      if (typeof pkg.bin === "string") {
        base.bin = [base.name.split("/").pop()!];
      } else if (pkg.bin && typeof pkg.bin === "object") {
        base.bin = Object.keys(pkg.bin);
      }

      const allDeps = { ...depsObj, ...devObj };
      base.keyDeps = Object.keys(allDeps).filter((d) => NOTABLE.has(d));

      // trustedDependencies — packages allowed to run lifecycle scripts
      if (Array.isArray(pkg.trustedDependencies)) {
        base.trustedDeps = pkg.trustedDependencies;
      }

      // overrides (npm) / resolutions (yarn) — metadependency version pins
      if (pkg.overrides && typeof pkg.overrides === "object") {
        base.overrides = Object.keys(pkg.overrides);
      }
      if (pkg.resolutions && typeof pkg.resolutions === "object") {
        base.resolutions = Object.keys(pkg.resolutions);
      }

      // repository — string shorthand or { url } object
      const rawRepo = typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url;
      if (rawRepo) {
        base.repo = normalizeGitUrl(rawRepo);
        base.repoSource = "pkg";
        const meta = parseRepoMeta(base.repo);
        base.repoHost = meta.host;
        base.repoOwner = meta.owner;
      }
    } catch {
      // malformed JSON — leave defaults
    }
  }

  // Git remote fallback when package.json has no repository
  if (base.repo === "-") {
    try {
      const result = Bun.spawnSync(["git", "remote", "get-url", "origin"], { cwd: dir, stdout: "pipe", stderr: "ignore" });
      if (result.success) {
        const remote = result.stdout.toString().trim();
        if (remote) {
          base.repo = normalizeGitUrl(remote);
          base.repoSource = "git";
          const meta = parseRepoMeta(base.repo);
          base.repoHost = meta.host;
          base.repoOwner = meta.owner;
        }
      }
    } catch { /* no git */ }
  }

  // .env file detection (Bun load order: .env.local → .env.[NODE_ENV] → .env)
  const envCandidates = [".env", ".env.local", ".env.development", ".env.production", ".env.test"];
  const envChecks = await Promise.all(envCandidates.map((f) => Bun.file(`${dir}/${f}`).exists()));
  base.envFiles = envCandidates.filter((_, i) => envChecks[i]);

  // Lock file detection
  const [hasLock, hasLockb] = await Promise.all([
    Bun.file(`${dir}/bun.lock`).exists(),
    Bun.file(`${dir}/bun.lockb`).exists(),
  ]);
  if (hasLock) {
    base.lock = "bun.lock";
    try {
      // bun.lock is JSONC (trailing commas) — regex the header instead of JSON.parse
      const lockHead = (await Bun.file(`${dir}/bun.lock`).text()).slice(0, 200);
      const cvMatch = lockHead.match(/"configVersion"\s*:\s*(\d+)/);
      if (cvMatch) base.configVersion = parseInt(cvMatch[1], 10);
    } catch { /* unreadable — leave -1 */ }
  } else if (hasLockb) {
    base.lock = "bun.lockb";
    // binary format — configVersion not extractable
  }

  // bunfig.toml — detect presence, parse registry, scopes, and [install] options
  const bunfigFile = Bun.file(`${dir}/bunfig.toml`);
  base.bunfig = await bunfigFile.exists();
  if (base.bunfig) {
    try {
      const toml = await bunfigFile.text();
      // Match registry under [install] section: registry = "..."
      const match = toml.match(/^\s*registry\s*=\s*"([^"]+)"/m);
      if (match) base.registry = match[1].replace(/^https?:\/\//, "");

      // Detect [install.scopes] — extract scope names like "@factorywager", "@duoplus"
      const scopeMatches = toml.matchAll(/^\s*"(@[^"]+)"\s*=/gm);
      const inScopes = toml.includes("[install.scopes]");
      if (inScopes) {
        for (const m of scopeMatches) {
          base.scopes.push(m[1]);
        }
      }

      // Boolean [install] options
      const boolOpt = (key: string): boolean => {
        const m = toml.match(new RegExp(`^\\s*${key}\\s*=\\s*(true|false)`, "m"));
        return m?.[1] === "true";
      };
      base.frozenLockfile = boolOpt("frozenLockfile");
      base.production = boolOpt("production");
      base.exact = boolOpt("exact");
      base.saveTextLockfile = boolOpt("saveTextLockfile");
      base.linkWorkspacePackages = boolOpt("linkWorkspacePackages");

      // String [install] options
      const strOpt = (key: string): string | undefined => {
        const m = toml.match(new RegExp(`^\\s*${key}\\s*=\\s*"([^"]+)"`, "m"));
        return m?.[1];
      };
      const linkerVal = strOpt("linker");
      if (linkerVal) base.linker = linkerVal;
      const backendVal = strOpt("backend");
      if (backendVal) base.backend = backendVal;
      const cpuVal = strOpt("cpu");
      if (cpuVal) base.targetCpu = cpuVal;
      const osVal = strOpt("os");
      if (osVal) base.targetOs = osVal;
      base.noVerify = boolOpt("noVerify");
      base.verbose = boolOpt("verbose");
      base.silent = boolOpt("silent");

      // Number [install] options
      const numOpt = (key: string): number => {
        const m = toml.match(new RegExp(`^\\s*${key}\\s*=\\s*(\\d+)`, "m"));
        return m ? parseInt(m[1], 10) : 0;
      };
      base.minimumReleaseAge = numOpt("minimumReleaseAge");
      base.concurrentScripts = numOpt("concurrentScripts");
      base.networkConcurrency = numOpt("networkConcurrency");

      // Nested: [install.cache] or cache.disable / cache.dir
      const cacheDirMatch = toml.match(/^\s*(?:cache\.)?dir\s*=\s*"([^"]+)"/m);
      if (cacheDirMatch && toml.includes("[install.cache]")) base.cacheDir = cacheDirMatch[1];
      // Also handle flat form: cache.dir = "..."
      const flatCacheDir = toml.match(/^\s*cache\.dir\s*=\s*"([^"]+)"/m);
      if (flatCacheDir) base.cacheDir = flatCacheDir[1];
      base.cacheDisabled = toml.includes("cache.disable = true") ||
        (toml.includes("[install.cache]") && boolOpt("disable"));

      // Nested: [install.security] or security.scanner = "..."
      const scannerMatch = toml.match(/^\s*(?:security\.)?scanner\s*=\s*"([^"]+)"/m);
      if (scannerMatch) base.securityScanner = scannerMatch[1];

      // Env var references: $VAR or ${VAR} or ${VAR?} in bunfig.toml
      const envRefs = new Set<string>();
      for (const m of toml.matchAll(/\$\{?([A-Z_][A-Z0-9_]*)\??\}?/g)) {
        envRefs.add(m[1]);
      }
      base.bunfigEnvRefs = [...envRefs].sort();

    } catch {}
  }

  // Fallback: package.json publishConfig.registry
  if (base.registry === "-" && base.hasPkg) {
    try {
      const pkg = await Bun.file(`${dir}/package.json`).json();
      const reg = pkg.publishConfig?.registry;
      if (reg) base.registry = reg.replace(/^https?:\/\//, "");
    } catch {}
  }

  // .npmrc existence + auth token detection
  const npmrcFile = Bun.file(`${dir}/.npmrc`);
  if (await npmrcFile.exists()) {
    base.hasNpmrc = true;
    try {
      const content = await npmrcFile.text();
      // Env-linked: ${FW_REGISTRY_TOKEN?} — only "ready" if the env var is actually set
      const isEnvLinked = content.includes("${FW_REGISTRY_TOKEN?}");
      base.resilient = isEnvLinked;
      if (isEnvLinked) {
        base.authReady = !!Bun.env.FW_REGISTRY_TOKEN;
      } else {
        base.authReady = content.includes("_authToken");
      }
    } catch {}
  }

  // bin/ directory detection ($PROJECT_HOME/bin)
  try {
    const binStat = await Bun.file(`${dir}/bin`).exists();
    // Bun.file().exists() returns false for dirs — use readdir instead
    const binEntries = await readdir(`${dir}/bin`).catch(() => null);
    base.hasBinDir = binEntries !== null && binEntries.length > 0;
  } catch {
    base.hasBinDir = false;
  }

  return base;
}

// ── IPC worker pool for parallel project scanning ─────────────────────

type IPCToWorker = { type: "scan"; id: number; dir: string } | { type: "shutdown" };
type IPCFromWorker =
  | { type: "ready" }
  | { type: "result"; id: number; data: ProjectInfo }
  | { type: "error"; id: number; error: string };

async function scanProjectsViaIPC(dirs: string[]): Promise<ProjectInfo[]> {
  const cpuCount = availableParallelism();
  const poolSize = Math.min(cpuCount, dirs.length, 8);
  const workerPath = new URL("./scan-worker.ts", import.meta.url).pathname;
  const results = new Map<number, ProjectInfo>();
  let nextIdx = 0;

  return new Promise<ProjectInfo[]>((resolve, reject) => {
    const workers: ReturnType<typeof Bun.spawn>[] = [];
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        cleanup();
        reject(new Error("IPC worker pool timed out after 30s"));
      }
    }, 30_000);

    function cleanup() {
      clearTimeout(timer);
      process.removeListener("SIGINT", sigHandler);
      for (const w of workers) {
        try { w.kill(); } catch {}
      }
    }

    function finish() {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(dirs.map((_, i) => results.get(i)!));
    }

    function dispatch(worker: ReturnType<typeof Bun.spawn>) {
      if (nextIdx < dirs.length) {
        const id = nextIdx++;
        worker.send({ type: "scan", id, dir: dirs[id] } satisfies IPCToWorker);
      } else {
        worker.send({ type: "shutdown" } satisfies IPCToWorker);
      }
    }

    function handleMessage(worker: ReturnType<typeof Bun.spawn>, msg: IPCFromWorker) {
      if (settled) return;
      if (msg.type === "ready") {
        dispatch(worker);
      } else if (msg.type === "result") {
        results.set(msg.id, msg.data);
        if (results.size === dirs.length) finish();
        else dispatch(worker);
      } else if (msg.type === "error") {
        // Per-project fallback: scan inline if worker fails for this project
        const failedId = msg.id;
        scanProject(dirs[failedId])
          .then((data) => {
            results.set(failedId, data);
            if (results.size === dirs.length) finish();
            else dispatch(worker);
          })
          .catch(() => {
            if (!settled) {
              settled = true;
              cleanup();
              reject(new Error(`Failed to scan ${dirs[failedId]}`));
            }
          });
      }
    }

    for (let i = 0; i < poolSize; i++) {
      const worker = Bun.spawn(["bun", workerPath], {
        stdio: ["ignore", "ignore", "ignore"],
        ipc(message) {
          handleMessage(worker, message as IPCFromWorker);
        },
      });
      workers.push(worker);
    }

    const sigHandler = () => {
      if (!settled) {
        settled = true;
        cleanup();
      }
      process.exit(130);
    };
    process.on("SIGINT", sigHandler);
  });
}

// ── Filter matching (globs + boolean field expressions) ────────────────
const BOOL_FIELDS = new Set<string>([
  "bunfig", "workspace", "authReady", "hasNpmrc", "hasBinDir", "hasPkg", "scoped", "resilient",
  "frozenLockfile", "production", "exact", "saveTextLockfile", "cacheDisabled", "linkWorkspacePackages",
]);

function matchFilter(p: ProjectInfo, pattern: string): boolean {
  // Boolean field expression: "authReady", "!authReady", "\!hasNpmrc", etc.
  // Strip shell-escaped backslash before !
  const cleaned = pattern.replace(/^\\!/, "!");
  const negated = cleaned.startsWith("!");
  const field = negated ? cleaned.slice(1) : cleaned;
  if (BOOL_FIELDS.has(field)) {
    const val = field === "scoped" ? p.scopes.length > 0 : !!(p as any)[field];
    return negated ? !val : val;
  }

  // Glob match against folder or name
  const glob = new Bun.Glob(pattern);
  return glob.match(p.folder) || glob.match(p.name);
}

// ── Deep inspect view ──────────────────────────────────────────────────
function inspectProject(p: ProjectInfo) {
  const line = (label: string, value: string | number | boolean) =>
    console.log(`  ${c.cyan(label.padEnd(16))} ${value}`);

  console.log();
  console.log(c.bold(c.magenta(`  ╭─ ${p.name} ─╮`)));
  console.log();
  line("Folder",       p.folder);
  line("Name",         p.name);
  line("Version",      p.version);
  line("Description",  p.description);
  line("Author",       p.author);
  line("License",      p.license);
  console.log();
  line("Dependencies", p.deps);
  line("DevDeps",      p.devDeps);
  line("Total Deps",   p.totalDeps);
  line("Scripts",      p.scriptsCount);
  console.log();
  line("Engine (bun)", p.engine);
  line("Lock File",    p.lock);
  line("Bunfig",       p.bunfig ? c.green("yes") : c.dim("no"));
  line("Workspace",    p.workspace ? c.green("yes") : c.dim("no"));
  const envReg = Bun.env.BUN_CONFIG_REGISTRY;
  if (envReg) {
    const envDisplay = envReg.replace(/^https?:\/\//, "");
    line("Registry",     `${envDisplay} ${c.dim("(BUN_CONFIG_REGISTRY override)")}`);
    if (p.registry !== "-" && p.registry !== envDisplay)
      line("",           c.dim(`bunfig/pkg: ${p.registry} (shadowed)`));
  } else {
    line("Registry",     p.registry !== "-" ? p.registry : c.dim("default"));
  }
  line("Scopes",       p.scopes.length ? c.green(p.scopes.join(", ")) : c.dim("none"));
  line(".npmrc",       p.hasNpmrc ? c.green("yes") : c.dim("no"));
  line("Auth Ready",   p.authReady ? c.green("YES") : c.dim("no"));
  line("Resilient",    p.resilient ? c.green("YES") : c.dim("no"));
  line("bin/",         p.hasBinDir ? c.green("yes") : c.dim("no"));
  line("Has pkg.json", p.hasPkg ? c.green("yes") : c.red("no"));
  console.log();
  line("Bin",          p.bin.length ? p.bin.join(", ") : c.dim("none"));
  line("Key Deps",     p.keyDeps.length ? p.keyDeps.join(", ") : c.dim("none"));

  // bunfig [install] settings
  if (p.bunfig) {
    console.log();
    console.log(`  ${c.bold(c.cyan("bunfig [install]"))}`);
    console.log();
    line("Frozen Lock",   p.frozenLockfile ? c.green("yes") : c.dim("no"));
    line("Production",    p.production ? c.yellow("yes") : c.dim("no"));
    line("Exact",         p.exact ? c.green("yes") : c.dim("no"));
    const eff = effectiveLinker(p);
    line("Linker",        p.linker !== "-" ? p.linker : c.dim("not set"));
    line("configVersion", p.configVersion >= 0 ? String(p.configVersion) : c.dim(p.lock === "bun.lockb" ? "binary" : "none"));
    line("Effective",     `${eff.strategy === "isolated" ? c.cyan(eff.strategy) : eff.strategy} ${c.dim(`(${eff.source})`)}`);

    const defaultBackend = process.platform === "darwin" ? "clonefile" : "hardlink";
    line("Backend",       p.backend !== "-" ? p.backend : c.dim(`default (${defaultBackend})`));
    line("Min Age",       p.minimumReleaseAge > 0 ? `${p.minimumReleaseAge}s (${(p.minimumReleaseAge / 86400).toFixed(1)}d)` : c.dim("none"));
    line("Text Lock",     p.saveTextLockfile ? c.green("yes") : c.dim("no"));
    line("Link WS Pkgs",  p.linkWorkspacePackages ? c.green("yes") : c.dim("no"));
    line("Cache",         p.cacheDisabled ? c.yellow("disabled") : p.cacheDir !== "-" ? p.cacheDir : c.dim("default"));
    line("No Verify",     p.noVerify ? c.red("yes") : c.dim("no"));
    line("Logging",        p.verbose ? c.yellow("verbose (lifecycle scripts visible)") : p.silent ? c.dim("silent") : c.dim("default"));
    const cpuCount = navigator?.hardwareConcurrency ?? 0;
    const defaultScriptConc = cpuCount > 0 ? cpuCount * 2 : "cpu\u00d72";
    line("Scripts Conc.",  p.concurrentScripts > 0 ? String(p.concurrentScripts) : c.dim(`default (${defaultScriptConc})`));
    line("Network Conc.",  p.networkConcurrency > 0 ? String(p.networkConcurrency) : c.dim("default (48)"));
    const hasCross = p.targetCpu !== "-" || p.targetOs !== "-";
    if (hasCross) {
      const cpuDisplay = p.targetCpu !== "-" ? (VALID_CPU.has(p.targetCpu) ? p.targetCpu : c.red(`${p.targetCpu} (invalid)`)) : process.arch;
      const osDisplay = p.targetOs !== "-" ? (VALID_OS.has(p.targetOs) ? p.targetOs : c.red(`${p.targetOs} (invalid)`)) : process.platform;
      line("Target",      `${cpuDisplay}/${osDisplay} ${c.yellow("(cross-platform)")}`);
    } else {
      line("Target",      c.dim(`${process.arch}/${process.platform} (native)`));
    }
    line("Scanner",       p.securityScanner !== "-" ? p.securityScanner : c.dim("none"));
    line("Lifecycle",     p.trustedDeps.length === 0 ? c.green("BLOCKED (default-secure)") : c.yellow(`${p.trustedDeps.length} trusted`));
    if (p.trustedDeps.length > 0) line("Trusted Deps",  p.trustedDeps.join(", "));
  }

  // Overrides / resolutions (package.json)
  const hasOverrides = p.overrides.length > 0 || p.resolutions.length > 0;
  if (hasOverrides) {
    console.log();
    console.log(`  ${c.bold(c.cyan("Dependency Overrides"))}`);
    console.log();
    if (p.overrides.length > 0) line("overrides",    `${c.yellow(String(p.overrides.length))} — ${p.overrides.join(", ")}`);
    if (p.resolutions.length > 0) line("resolutions", `${c.yellow(String(p.resolutions.length))} — ${p.resolutions.join(", ")}`);
  }
  console.log();
}

// ── Table rendering ────────────────────────────────────────────────────
function renderTable(projects: ProjectInfo[], detail: boolean) {
  const rows = projects.map((p) => {
    const base: Record<string, string | number | boolean> = {
      Path:      p.folder,
      Name:      p.name,
      Version:   p.version,
      Deps:      p.totalDeps || "-",
      Engine:    p.engine,
      Lock:      p.lock,
      Registry:  p.registry !== "-" ? p.registry : "-",
      Scopes:    p.scopes.length ? p.scopes.join(", ") : "-",
      Auth:      p.authReady ? "YES" : "-",
      Bunfig:    p.bunfig ? "yes" : "-",
      Linker:    (() => { const eff = effectiveLinker(p); return eff.source === "bunfig" ? eff.strategy : `${eff.strategy} (default)`; })(),
      Workspace: p.workspace ? "yes" : "-",
      Bin:       p.bin.length ? p.bin.join(", ") : "-",
      Repo:      p.repo !== "-" ? p.repo : "-",
      "Repo Src": p.repoSource,
      "Repo Owner": p.repoOwner,
      "Repo Host": p.repoHost,
      Env:       p.envFiles.length ? p.envFiles.join(", ") : "-",
      "Env Refs": p.bunfigEnvRefs.length ? p.bunfigEnvRefs.join(", ") : "-",
      Color:     Bun.env.FORCE_COLOR ? "forced" : Bun.env.NO_COLOR === "1" ? "off" : "auto",
      Trusted:   p.trustedDeps.length ? p.trustedDeps.join(", ") : "-",
      Overrides: p.overrides.length + p.resolutions.length || "-",
      "Key Deps": p.keyDeps.join(", ") || "-",
    };

    if (detail) {
      base.Author = p.author;
      base.License = p.license;
      base.Description = p.description.length > 40
        ? p.description.slice(0, 37) + "..."
        : p.description;
      base.Scripts = p.scriptsCount || "-";
    }

    return base;
  });

  console.table(rows);
}

// ── Sort comparator ────────────────────────────────────────────────────
function sortProjects(projects: ProjectInfo[], key: string): ProjectInfo[] {
  const sorted = [...projects];
  switch (key) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "totalDeps":
    case "deps":
      return sorted.sort((a, b) => b.totalDeps - a.totalDeps);
    case "version":
      return sorted.sort((a, b) => a.version.localeCompare(b.version));
    case "lock":
      return sorted.sort((a, b) => a.lock.localeCompare(b.lock));
    default:
      console.error(c.yellow(`Unknown sort key: ${key}. Using default order.`));
      return sorted;
  }
}

// ── Audit: report missing fields ───────────────────────────────────────
function getMissing(p: ProjectInfo): AuditField[] {
  if (!p.hasPkg) return [];
  const missing: AuditField[] = [];
  if (p.author === "-") missing.push("author");
  if (p.license === "-") missing.push("license");
  if (p.description === "-") missing.push("description");
  if (p.version === "-") missing.push("version");
  if (p.engine === "-") missing.push("engine");
  return missing;
}

async function renderAudit(projects: ProjectInfo[]) {
  const withPkg = projects.filter((p) => p.hasPkg);
  const withoutPkg = projects.filter((p) => !p.hasPkg);

  // Per-field totals
  const totals: Record<string, number> = {};
  for (const f of AUDIT_FIELDS) totals[f] = 0;

  const issues: { name: string; folder: string; missing: string }[] = [];

  for (const p of withPkg) {
    const missing = getMissing(p);
    for (const f of missing) totals[f]++;
    if (missing.length > 0) {
      issues.push({
        name: p.name,
        folder: p.folder,
        missing: missing.map((f) => c.red(f)).join(", "),
      });
    }
  }

  console.log();
  console.log(c.bold(c.cyan("  Metadata Audit")));
  console.log();

  // Summary counts
  console.log(c.bold("  Field coverage across " + withPkg.length + " projects with package.json:"));
  console.log();
  for (const f of AUDIT_FIELDS) {
    const present = withPkg.length - totals[f];
    const pct = ((present / withPkg.length) * 100).toFixed(0);
    const bar = present === withPkg.length ? c.green("OK") : c.yellow(`${totals[f]} missing`);
    console.log(`    ${c.cyan(f.padEnd(14))} ${String(present).padStart(2)}/${withPkg.length}  (${pct}%)  ${bar}`);
  }

  // Global environment overrides (BUN_CONFIG_* have higher priority than bunfig.toml)
  const BUN_ENV_VARS: { key: string; desc: string; offLabel?: string; recommend?: string }[] = [
    { key: "BUN_PLATFORM_HOME",              desc: "scan root" },
    { key: "BUN_CONFIG_REGISTRY",            desc: "overrides all bunfig.toml [install] registry" },
    { key: "BUN_CONFIG_TOKEN",               desc: "auth token (currently unused by Bun)" },
    { key: "BUN_CONFIG_FROZEN_LOCKFILE",     desc: "refuse lockfile updates on mismatch" },
    { key: "BUN_CONFIG_SAVE_TEXT_LOCKFILE",  desc: "text-based bun.lock (v1.2+)" },
    { key: "BUN_CONFIG_SKIP_SAVE_LOCKFILE",  desc: "lockfile saving",   offLabel: "ON" },
    { key: "BUN_CONFIG_SKIP_LOAD_LOCKFILE",  desc: "lockfile loading",  offLabel: "ON" },
    { key: "BUN_CONFIG_SKIP_INSTALL_PACKAGES", desc: "package installs", offLabel: "ON" },
    { key: "BUN_CONFIG_YARN_LOCKFILE",       desc: "yarn.lock compat" },
    { key: "BUN_CONFIG_LINK_NATIVE_BINS",    desc: "platform-specific bin linking" },
    { key: "BUN_CONFIG_DRY_RUN",             desc: "simulate install (no changes)" },
    { key: "BUN_CONFIG_DISABLE_CACHE",       desc: "disable global cache reads" },
    { key: "BUN_CONFIG_MINIMUM_RELEASE_AGE", desc: "min package version age (seconds)" },
    { key: "BUN_INSTALL_CACHE_DIR",          desc: "custom cache directory" },
    { key: "BUN_INSTALL_GLOBAL_DIR",         desc: "global packages directory" },
    { key: "BUN_INSTALL_BIN",               desc: "global binaries directory" },
    { key: "BUN_FEATURE_FLAG_DISABLE_IGNORE_SCRIPTS", desc: "lifecycle scripts blocked", offLabel: "BLOCKED" },
    { key: "BUN_FEATURE_FLAG_DISABLE_NATIVE_DEPENDENCY_LINKER", desc: "native bin linking", offLabel: "ON" },
    // Runtime & networking
    { key: "NODE_TLS_REJECT_UNAUTHORIZED",   desc: "SSL cert validation (0 = INSECURE)" },
    { key: "BUN_CONFIG_MAX_HTTP_REQUESTS",   desc: "max concurrent HTTP requests (default 256)" },
    { key: "BUN_CONFIG_VERBOSE_FETCH",       desc: "log fetch requests (curl | 1)" },
    { key: "BUN_OPTIONS",                    desc: "prepend CLI args to every bun invocation" },
    // Caching & temp
    { key: "BUN_RUNTIME_TRANSPILER_CACHE_PATH", desc: "transpiler cache dir (\"\" or \"0\" = disabled)", recommend: "${BUN_PLATFORM_HOME}/.bun-cache" },
    { key: "TMPDIR",                         desc: "temp directory for bundler intermediates" },
    // Display
    { key: "NO_COLOR",                       desc: "ANSI color output", offLabel: "ON" },
    { key: "FORCE_COLOR",                    desc: "force ANSI color (overrides NO_COLOR)" },
    // Dev experience
    { key: "BUN_CONFIG_NO_CLEAR_TERMINAL_ON_RELOAD", desc: "keep console on --watch reload" },
    // Telemetry
    { key: "DO_NOT_TRACK",                   desc: "disable crash reports & telemetry", recommend: "1" },
  ];

  console.log();
  console.log(c.bold("  Global overrides:"));
  console.log();
  const PAD = 42;
  for (const { key, desc, offLabel, recommend } of BUN_ENV_VARS) {
    const val = Bun.env[key];
    if (offLabel) {
      const flag = classifyEnvFlag(val, offLabel);
      const display = flag.state === "inactive" ? c.green(flag.label)
        : flag.state === "active" ? c.yellow(flag.label)
        : c.dim(flag.label);
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${display}  ${c.dim(desc)}`);
    } else if (val) {
      // Flag NODE_TLS_REJECT_UNAUTHORIZED=0 as a security risk
      const valColor = key === "NODE_TLS_REJECT_UNAUTHORIZED" && val === "0" ? c.red : c.green;
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${valColor(val)}  ${c.dim(desc)}`);
    } else if (recommend) {
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${c.yellow("not set")}  ${c.dim(desc)}  ${c.yellow(`-> recommend ${key}=${recommend}`)}`);
    } else {
      console.log(`    ${c.cyan(key.padEnd(PAD))} ${c.dim("not set")}  ${c.dim(desc)}`);
    }
  }

  // Infrastructure readiness
  console.log();
  console.log(c.bold("  Infrastructure readiness:"));
  console.log();
  const withNpmrc = withPkg.filter((p) => p.hasNpmrc).length;
  const withAuth = withPkg.filter((p) => p.authReady).length;
  const withScopes = withPkg.filter((p) => p.scopes.length > 0).length;
  const withResilient = withPkg.filter((p) => p.resilient).length;
  const withBinDir = withPkg.filter((p) => p.hasBinDir).length;
  const infra = [
    { label: ".npmrc",     count: withNpmrc,      desc: "connected to registry" },
    { label: "auth token", count: withAuth,       desc: "publish-ready" },
    { label: "resilient",  count: withResilient,  desc: "\\${VAR?} graceful undefined" },
    { label: "scoped",     count: withScopes,     desc: "[install.scopes] configured" },
    { label: "bin/",       count: withBinDir,      desc: "custom tools" },
  ];

  // Lifecycle security — default-secure is green
  const defaultSecure = withPkg.filter((p) => p.trustedDeps.length === 0).length;
  const withTrusted = withPkg.length - defaultSecure;
  for (const { label, count, desc } of infra) {
    const pct = ((count / withPkg.length) * 100).toFixed(0);
    const bar = count === withPkg.length ? c.green("OK") : count === 0 ? c.red(`${count}/${withPkg.length}`) : c.yellow(`${count}/${withPkg.length}`);
    console.log(`    ${c.cyan(label.padEnd(14))} ${String(count).padStart(2)}/${withPkg.length}  (${pct}%)  ${bar}  ${c.dim(desc)}`);
  }

  // Dependency overrides / resolutions
  const withOverrides = withPkg.filter((p) => p.overrides.length > 0);
  const withResolutions = withPkg.filter((p) => p.resolutions.length > 0);
  const totalOverrideCount = withOverrides.reduce((n, p) => n + p.overrides.length, 0);
  const totalResolutionCount = withResolutions.reduce((n, p) => n + p.resolutions.length, 0);
  if (withOverrides.length > 0 || withResolutions.length > 0) {
    console.log();
    console.log(c.bold("  Dependency overrides:"));
    console.log();
    if (withOverrides.length > 0) {
      console.log(`    ${c.cyan("overrides".padEnd(14))} ${c.yellow(String(withOverrides.length))} project(s), ${totalOverrideCount} pinned metadependencies`);
      for (const p of withOverrides) {
        console.log(`      ${c.dim("•")} ${p.folder.padEnd(28)} ${c.dim(p.overrides.join(", "))}`);
      }
    }
    if (withResolutions.length > 0) {
      console.log(`    ${c.cyan("resolutions".padEnd(14))} ${c.yellow(String(withResolutions.length))} project(s), ${totalResolutionCount} pinned metadependencies`);
      for (const p of withResolutions) {
        console.log(`      ${c.dim("•")} ${p.folder.padEnd(28)} ${c.dim(p.resolutions.join(", "))}`);
      }
    }
  }

  // Lifecycle security posture — scan node_modules for per-hook metrics
  console.log();
  console.log(c.bold("  Lifecycle security:"));
  console.log();
  const envOverride = isFeatureFlagActive(Bun.env.BUN_FEATURE_FLAG_DISABLE_IGNORE_SCRIPTS);

  // Scan node_modules for actual lifecycle scripts per hook
  const HOOKS = ["preinstall", "postinstall", "preuninstall", "prepare", "preprepare", "postprepare", "prepublishOnly"] as const;
  const hookTotals: Record<string, { found: number; trusted: number; blocked: number; nativeDetected: number; nativeTrusted: number }> = {};
  for (const h of HOOKS) hookTotals[h] = { found: 0, trusted: 0, blocked: 0, nativeDetected: 0, nativeTrusted: 0 };

  const xrefData: XrefEntry[] = [];

  for (const p of withPkg) {
    const nmDir = `${PROJECTS_ROOT}/${p.folder}/node_modules`;
    let entries: string[] = [];
    try { entries = await readdir(nmDir); } catch { continue; }

    const trusted = new Set(p.trustedDeps);
    const xref: XrefEntry = { folder: p.folder, bunDefault: [], explicit: [], blocked: [] };
    const xrefSeen = new Set<string>();

    const classifyPkg = (pkgName: string, scripts: Record<string, string>) => {
      const scriptValues = Object.values(scripts).join(" ");
      const isNative = NATIVE_PATTERN.test(pkgName) || NATIVE_PATTERN.test(scriptValues);
      let hasAnyHook = false;
      for (const h of HOOKS) {
        if (scripts[h]) {
          hasAnyHook = true;
          hookTotals[h].found++;
          if (trusted.has(pkgName)) hookTotals[h].trusted++;
          else hookTotals[h].blocked++;
          if (isNative) {
            hookTotals[h].nativeDetected++;
            if (trusted.has(pkgName)) hookTotals[h].nativeTrusted++;
          }
        }
      }
      if (hasAnyHook && !xrefSeen.has(pkgName)) {
        xrefSeen.add(pkgName);
        if (BUN_DEFAULT_TRUSTED.has(pkgName)) xref.bunDefault.push(pkgName);
        else if (trusted.has(pkgName)) xref.explicit.push(pkgName);
        else xref.blocked.push(pkgName);
      }
    };

    for (const entry of entries) {
      // Handle scoped packages (@org/pkg)
      if (entry.startsWith("@")) {
        let scoped: string[] = [];
        try { scoped = await readdir(`${nmDir}/${entry}`); } catch { continue; }
        for (const sub of scoped) {
          try {
            const pkg = await Bun.file(`${nmDir}/${entry}/${sub}/package.json`).json();
            classifyPkg(`${entry}/${sub}`, pkg.scripts ?? {});
          } catch {}
        }
        continue;
      }

      // Regular packages
      try {
        const pkg = await Bun.file(`${nmDir}/${entry}/package.json`).json();
        classifyPkg(entry, pkg.scripts ?? {});
      } catch {}
    }
    xrefData.push(xref);
  }

  // Avg time per blocked script (conservative estimates based on typical npm postinstall behavior)
  const HOOK_AVG_MS: Record<string, number> = {
    preinstall: 500, postinstall: 2500, preuninstall: 300, prepare: 1000, preprepare: 300, postprepare: 300, prepublishOnly: 500,
  };

  // Per-hook metadata: owner + recommended action (with code snippets)
  type HookStats = typeof hookTotals[string];
  const HOOK_META: Record<string, { owner: (t: HookStats) => string; action: (t: HookStats) => string }> = {
    preinstall: {
      owner: (t) => t.found === 0 ? "System Default" : t.found <= 3 ? "clawdbot" : `Power ${withTrusted}`,
      action: (t) => t.found === 0 ? "No action"
        : `Keep trusted; add engine verify: "preinstall": "bun --version" (${t.nativeDetected} native)`,
    },
    postinstall: {
      owner: (t) => t.found === 0 ? "System Default" : `Power ${withTrusted}`,
      action: (t) => {
        if (t.found === 0) return "No action";
        if (t.blocked > 0) return `Scan with --fix-trusted; block in CI. ${t.nativeDetected} native (${t.nativeTrusted} trusted, ${t.nativeDetected - t.nativeTrusted} uncovered)`;
        return "Verified — audit with bun pm ls --all periodically";
      },
    },
    preuninstall: {
      owner: () => "System Default",
      action: (t) => t.found === 0 ? "No action; add \"preuninstall\": \"rm -rf temp/\" if temp dirs present" : "Review cleanup scripts",
    },
    prepare: {
      owner: (t) => t.found === 0 ? "System Default" : `Power ${withTrusted}`,
      action: (t) => t.found === 0 ? "No action" : t.blocked > 0 ? `${t.blocked} blocked — review for build steps` : "Verified",
    },
    preprepare: {
      owner: () => "System Default",
      action: (t) => t.found === 0 ? "No action" : "Review pre-prepare hooks",
    },
    postprepare: {
      owner: () => "System Default",
      action: (t) => t.found === 0 ? "No action" : "Review post-prepare hooks",
    },
    prepublishOnly: {
      owner: () => "R2 Auditor",
      action: (t) => t.found === 0
        ? "Implement audit gate: \"prepublishOnly\": \"bun scan.ts --audit\""
        : t.blocked > 0 ? `${t.blocked} consumer-side hooks blocked (expected)` : "Verified",
    },
  };

  console.log();
  // Header row
  console.log(`    ${c.cyan("Hook".padEnd(16))} ${"Total".padStart(5)}  ${"Trust".padStart(5)}  ${"Block".padStart(5)}  ${"Secure".padStart(6)}  ${"Saved".padStart(7)}  ${"Risk".padStart(4)}  ${"Status".padEnd(12)}  ${"Native".padStart(6)}  ${"Cov%".padStart(4)}  Owner`);

  // Default posture row
  if (envOverride) {
    console.log(`    ${c.cyan("default".padEnd(16))} ${c.dim("-").padStart(5)}  ${c.dim("-").padStart(5)}  ${c.dim("-").padStart(5)}  ${c.dim("-").padStart(6)}  ${c.dim("-").padStart(7)}  ${c.red("High")}  ${c.red("OPEN").padEnd(22)}  ${c.dim("-").padStart(6)}  ${c.dim("-")}  ${c.dim("OVERRIDE")}`);
    console.log(`    ${" ".repeat(16)} ${c.red("-> WARNING: DISABLE_IGNORE_SCRIPTS is set — all lifecycle scripts run globally")}`);
  } else {
    console.log(`    ${c.cyan("default".padEnd(16))} ${c.dim("-").padStart(5)}  ${c.dim("-").padStart(5)}  ${c.dim("-").padStart(5)}  ${"100%".padStart(6)}  ${c.dim("-").padStart(7)}  ${c.dim("Min")}  ${c.green("Blocked").padEnd(22)}  ${c.dim("-").padStart(6)}  ${c.dim("-")}  ${c.dim("Bun Runtime")}`);
    console.log(`    ${" ".repeat(16)} ${c.dim("-> Default-secure: all lifecycle scripts blocked unless in trustedDependencies")}`);
  }

  let totalTimeSaved = 0;
  for (const h of HOOKS) {
    const { found, trusted, blocked, nativeDetected, nativeTrusted } = hookTotals[h];
    const pctSecure = found === 0 ? "100%" : trusted === found ? "100%" : `${((trusted / found) * 100).toFixed(0)}%`;
    const savedMs = blocked * HOOK_AVG_MS[h];
    totalTimeSaved += savedMs;
    const savedStr = savedMs === 0 ? "-" : savedMs >= 60000 ? `${(savedMs / 60000).toFixed(1)}m` : `${(savedMs / 1000).toFixed(1)}s`;
    // Pad raw values BEFORE wrapping in ANSI colors (escape codes break padStart/padEnd)
    const riskRaw = found === 0 ? "Min" : blocked > 0 && trusted > 0 ? "Med" : blocked === 0 && trusted > 0 ? "Low" : blocked === found ? "Low" : "Min";
    const riskColor = riskRaw === "Med" ? c.yellow : riskRaw === "Low" ? c.green : c.dim;
    const risk = riskColor(riskRaw.padStart(4));

    const statusRaw = found === 0 && h === "prepublishOnly" ? "Ready" : found === 0 ? "Inactive" : blocked > 0 ? "Restricted" : trusted === found ? "Verified" : "Inactive";
    const statusColor = statusRaw === "Ready" ? c.cyan : statusRaw === "Inactive" ? c.dim : c.green;
    const status = statusColor(statusRaw.padEnd(14));

    const nativeRaw = nativeDetected === 0 ? "-" : String(nativeDetected);
    const nativeStr = (nativeDetected === 0 ? c.dim : (s: string) => s)(nativeRaw.padStart(6));

    const nativeCovRaw = nativeDetected === 0 ? "-" : nativeTrusted === nativeDetected ? "100%" : `${((nativeTrusted / nativeDetected) * 100).toFixed(0)}%`;
    const nativeCovColor = nativeDetected === 0 ? c.dim : nativeTrusted === nativeDetected ? c.green : c.yellow;
    const nativeCov = nativeCovColor(nativeCovRaw.padStart(4));

    const meta = HOOK_META[h];
    const owner = meta.owner(hookTotals[h]);
    console.log(`    ${c.cyan(h.padEnd(16))} ${String(found).padStart(5)}  ${String(trusted).padStart(5)}  ${String(blocked).padStart(5)}  ${pctSecure.padStart(6)}  ${savedStr.padStart(7)}  ${risk}  ${status}  ${nativeStr}  ${nativeCov}  ${c.dim(owner)}`);
    // Action on next line, indented
    const action = meta.action(hookTotals[h]);
    console.log(`    ${" ".repeat(16)} ${c.dim(`-> ${action}`)}`);
  }
  const totalSavedStr = totalTimeSaved >= 60000 ? `${(totalTimeSaved / 60000).toFixed(1)}m` : `${(totalTimeSaved / 1000).toFixed(1)}s`;
  console.log(`    ${c.dim("─".repeat(110))}`);
  const allFound = HOOKS.reduce((s, h) => s + hookTotals[h].found, 0);
  const allBlocked = HOOKS.reduce((s, h) => s + hookTotals[h].blocked, 0);
  const allTrusted = HOOKS.reduce((s, h) => s + hookTotals[h].trusted, 0);
  const allNative = HOOKS.reduce((s, h) => s + hookTotals[h].nativeDetected, 0);
  const allNativeTrusted = HOOKS.reduce((s, h) => s + hookTotals[h].nativeTrusted, 0);
  const totalPct = allFound === 0 ? "100%" : `${((allTrusted / allFound) * 100).toFixed(0)}%`;
  const totalNativeCov = allNative === 0 ? "-" : `${((allNativeTrusted / allNative) * 100).toFixed(0)}%`;
  console.log(`    ${c.bold("total".padEnd(16))} ${String(allFound).padStart(5)}  ${String(allTrusted).padStart(5)}  ${String(allBlocked).padStart(5)}  ${totalPct.padStart(6)}  ${totalSavedStr.padStart(7)}  ${c.dim("      ")}  ${c.dim("              ")}  ${String(allNative).padStart(6)}  ${totalNativeCov}  ${c.dim("100% managed")}`);

  console.log();
  console.log(`    ${c.cyan("locked down".padEnd(14))} ${String(defaultSecure).padStart(2)}/${withPkg.length}  ${defaultSecure === withPkg.length ? c.green("OK") : c.green(`${defaultSecure}`)}  ${c.dim("no trustedDependencies — all scripts blocked")}`);
  if (withTrusted > 0) {
    console.log(`    ${c.cyan("explicit trust".padEnd(14))} ${String(withTrusted).padStart(2)}/${withPkg.length}  ${c.yellow(`${withTrusted}`)}  ${c.dim("trustedDependencies declared — scripts allowed for listed packages")}`);
    const trustedProjects = withPkg.filter((p) => p.trustedDeps.length > 0);
    for (const p of trustedProjects) {
      console.log(`      ${c.dim("•")} ${p.folder.padEnd(28)} ${c.dim(p.trustedDeps.join(", "))}`);
    }
  }

  // Bun default trust cross-reference
  const xrefWithScripts = xrefData.filter((x) => x.bunDefault.length + x.explicit.length + x.blocked.length > 0);
  if (xrefWithScripts.length > 0) {
    const totalBunDefault = xrefWithScripts.reduce((s, x) => s + x.bunDefault.length, 0);
    const prevSnapshot = await loadXrefSnapshot(flags["audit-compare"] ?? undefined);
    const prevMap = new Map<string, XrefEntry>();
    if (prevSnapshot) {
      for (const p of prevSnapshot.projects) prevMap.set(p.folder, p);
    }
    const hasDelta = prevSnapshot !== null;

    const formatDelta = (cur: number, prev: number | undefined): string => {
      if (prev === undefined) return c.cyan("new".padStart(5));
      const diff = cur - prev;
      if (diff > 0) return c.green(`+${diff}`.padStart(5));
      if (diff < 0) return c.red(`${diff}`.padStart(5));
      return c.dim("=".padStart(5));
    };

    console.log();
    console.log(c.bold(`  Bun default trust cross-reference (${BUN_DEFAULT_TRUSTED.size} known packages):`));
    console.log();
    const deltaHeader = hasDelta ? `  ${"Δ Def".padStart(5)}  ${"Δ Exp".padStart(5)}  ${"Δ Blk".padStart(5)}` : "";
    console.log(`    ${"Project".padEnd(30)} ${"Default".padStart(7)}  ${"Explicit".padStart(8)}  ${"Blocked".padStart(7)}${deltaHeader}  Packages`);
    for (const x of xrefWithScripts) {
      const parts: string[] = [];
      if (x.bunDefault.length > 0) parts.push(x.bunDefault.join(", "));
      if (x.explicit.length > 0) parts.push(x.explicit.join(", "));
      if (x.blocked.length > 0) parts.push(c.yellow(x.blocked.join(", ")));
      const defColor = x.bunDefault.length > 0 ? c.dim : (s: string) => s;
      const expColor = x.explicit.length > 0 ? c.cyan : (s: string) => s;
      let deltaCols = "";
      if (hasDelta) {
        const prev = prevMap.get(x.folder);
        deltaCols = `  ${formatDelta(x.bunDefault.length, prev?.bunDefault.length)}  ${formatDelta(x.explicit.length, prev?.explicit.length)}  ${formatDelta(x.blocked.length, prev?.blocked.length)}`;
      }
      console.log(`    ${x.folder.padEnd(30)} ${defColor(String(x.bunDefault.length).padStart(7))}  ${expColor(String(x.explicit.length).padStart(8))}  ${(x.blocked.length > 0 ? c.yellow : (s: string) => s)(String(x.blocked.length).padStart(7))}${deltaCols}   ${parts.join(c.dim(" | "))}`);
    }
    console.log();
    console.log(`  Summary: ${c.bold(String(totalBunDefault))} packages auto-trusted by Bun defaults across ${xrefData.length} projects`);

    // Comparison summary block
    if (prevSnapshot) {
      const currentFolders = new Set(xrefWithScripts.map((x) => x.folder));
      const prevFolders = new Set(prevSnapshot.projects.map((p) => p.folder));
      const newProjects = xrefWithScripts.filter((x) => !prevFolders.has(x.folder));
      const removedProjects = prevSnapshot.projects.filter((p) => !currentFolders.has(p.folder));
      const changedProjects: string[] = [];
      const unchangedCount = { value: 0 };
      for (const x of xrefWithScripts) {
        const prev = prevMap.get(x.folder);
        if (!prev) continue;
        const diffs: string[] = [];
        const dDef = x.bunDefault.length - prev.bunDefault.length;
        const dExp = x.explicit.length - prev.explicit.length;
        const dBlk = x.blocked.length - prev.blocked.length;
        if (dDef !== 0) diffs.push(`default ${dDef > 0 ? "+" : ""}${dDef}`);
        if (dExp !== 0) diffs.push(`explicit ${dExp > 0 ? "+" : ""}${dExp}`);
        if (dBlk !== 0) diffs.push(`blocked ${dBlk > 0 ? "+" : ""}${dBlk}`);
        if (diffs.length > 0) changedProjects.push(`${x.folder} (${diffs.join(", ")})`);
        else unchangedCount.value++;
      }
      console.log();
      console.log(c.bold(`  Cross-reference delta (vs ${prevSnapshot.timestamp}):`));
      console.log(`    ${"New projects:".padEnd(18)} ${c.cyan(String(newProjects.length))}${newProjects.length > 0 ? "   " + newProjects.map((x) => x.folder).join(", ") : ""}`);
      console.log(`    ${"Removed:".padEnd(18)} ${removedProjects.length > 0 ? c.red(String(removedProjects.length)) : c.dim(String(removedProjects.length))}${removedProjects.length > 0 ? "   " + removedProjects.map((p) => p.folder).join(", ") : ""}`);
      console.log(`    ${"Changed:".padEnd(18)} ${changedProjects.length > 0 ? c.yellow(String(changedProjects.length)) : c.dim(String(changedProjects.length))}${changedProjects.length > 0 ? "   " + changedProjects.join(", ") : ""}`);
      console.log(`    ${"Unchanged:".padEnd(18)} ${c.dim(String(unchangedCount.value))}`);
    }

    // Save snapshot (unless --compare or --no-auto-snapshot)
    if (!flags.compare && !flags["no-auto-snapshot"]) {
      await saveXrefSnapshot(xrefWithScripts, withPkg.length);
    }

    // --snapshot early return: save and exit after xref section
    if (flags.snapshot) {
      console.log();
      console.log(`  Snapshot saved to .audit/xref-snapshot.json (${xrefWithScripts.length} projects)`);
      return;
    }
  }

  // Global bunfig.toml detection
  const home = Bun.env.HOME ?? Bun.env.USERPROFILE ?? "";
  const xdg = Bun.env.XDG_CONFIG_HOME;
  const globalBunfigPath = xdg ? `${xdg}/.bunfig.toml` : `${home}/.bunfig.toml`;
  const globalBunfigFile = Bun.file(globalBunfigPath);
  const hasGlobalBunfig = await globalBunfigFile.exists();

  console.log();
  console.log(c.bold("  Global bunfig:"));
  console.log();
  if (hasGlobalBunfig) {
    try {
      const gToml = await globalBunfigFile.text();
      console.log(`    ${c.cyan("path".padEnd(20))} ${c.green(globalBunfigPath)}`);
      const gReg = gToml.match(/^\s*registry\s*=\s*"([^"]+)"/m);
      if (gReg) console.log(`    ${c.cyan("registry".padEnd(20))} ${gReg[1]}`);
      const gLinker = gToml.match(/^\s*linker\s*=\s*"([^"]+)"/m);
      if (gLinker) console.log(`    ${c.cyan("linker".padEnd(20))} ${gLinker[1]}`);
      const gFrozen = gToml.match(/^\s*frozenLockfile\s*=\s*(true|false)/m);
      if (gFrozen) console.log(`    ${c.cyan("frozenLockfile".padEnd(20))} ${gFrozen[1]}`);
      const gAge = gToml.match(/^\s*minimumReleaseAge\s*=\s*(\d+)/m);
      if (gAge) console.log(`    ${c.cyan("minimumReleaseAge".padEnd(20))} ${gAge[1]}s (${(parseInt(gAge[1]) / 86400).toFixed(1)}d)`);
      const gCache = gToml.match(/^\s*cache\.dir\s*=\s*"([^"]+)"/m) ?? gToml.match(/\[install\.cache\][\s\S]*?dir\s*=\s*"([^"]+)"/m);
      if (gCache) console.log(`    ${c.cyan("cache.dir".padEnd(20))} ${gCache[1]}`);
      console.log(`    ${c.dim("(shallow-merged under local bunfig.toml)")}`);
    } catch {
      console.log(`    ${c.yellow(globalBunfigPath)} ${c.red("(unreadable)")}`);
    }
  } else {
    console.log(`    ${c.dim("~/.bunfig.toml not found")}`);
  }

  // bunfig [install] coverage across projects
  const withBunfig = withPkg.filter((p) => p.bunfig);
  console.log();
  console.log(c.bold(`  bunfig [install] coverage (${withBunfig.length} projects with bunfig.toml):`));
  console.log();
  const installStats: { label: string; count: number; desc: string }[] = [
    { label: "frozenLockfile",   count: withBunfig.filter((p) => p.frozenLockfile).length,          desc: "CI-safe lockfile enforcement" },
    { label: "production",       count: withBunfig.filter((p) => p.production).length,              desc: "skip devDependencies" },
    { label: "exact",            count: withBunfig.filter((p) => p.exact).length,                   desc: "pin exact versions (no ^/~)" },
    { label: "linker",           count: withBunfig.filter((p) => p.linker !== "-").length,           desc: "explicit linker strategy" },
    { label: "backend",          count: withBunfig.filter((p) => p.backend !== "-").length,          desc: "explicit fs backend" },
    { label: "minReleaseAge",    count: withBunfig.filter((p) => p.minimumReleaseAge > 0).length,   desc: "supply-chain age gate" },
    { label: "saveTextLock",     count: withBunfig.filter((p) => p.saveTextLockfile).length,         desc: "text-based bun.lock" },
    { label: "linkWsPkgs",       count: withBunfig.filter((p) => p.linkWorkspacePackages).length,    desc: "workspace linking" },
    { label: "cacheDisabled",    count: withBunfig.filter((p) => p.cacheDisabled).length,            desc: "global cache bypassed" },
    { label: "cacheDir",         count: withBunfig.filter((p) => p.cacheDir !== "-").length,         desc: "custom cache path" },
    { label: "noVerify",         count: withBunfig.filter((p) => p.noVerify).length,                 desc: "skip integrity verification" },
    { label: "verbose",          count: withBunfig.filter((p) => p.verbose).length,                  desc: "debug logging (lifecycle scripts visible)" },
    { label: "silent",           count: withBunfig.filter((p) => p.silent).length,                   desc: "no logging" },
    { label: "concurrentScripts",count: withBunfig.filter((p) => p.concurrentScripts > 0).length,    desc: "custom lifecycle concurrency (default cpu\u00d72)" },
    { label: "networkConc.",     count: withBunfig.filter((p) => p.networkConcurrency > 0).length,   desc: "custom network concurrency (default 48)" },
    { label: "targetCpu",        count: withBunfig.filter((p) => p.targetCpu !== "-").length,        desc: "cross-platform cpu override" },
    { label: "targetOs",         count: withBunfig.filter((p) => p.targetOs !== "-").length,         desc: "cross-platform os override" },
    { label: "scanner",          count: withBunfig.filter((p) => p.securityScanner !== "-").length,  desc: "npm security scanner" },
    { label: "trustedDeps",      count: withBunfig.filter((p) => p.trustedDeps.length > 0).length,   desc: "lifecycle scripts allowed" },
  ];
  for (const { label, count, desc } of installStats) {
    const display = count > 0 ? c.green(`${count}/${withBunfig.length}`) : c.dim(`${count}/${withBunfig.length}`);
    console.log(`    ${c.cyan(label.padEnd(18))} ${display}  ${c.dim(desc)}`);
  }

  // Cross-platform target validation
  const crossProjects = withBunfig.filter((p) => p.targetCpu !== "-" || p.targetOs !== "-");
  if (crossProjects.length > 0) {
    console.log();
    console.log(c.bold(`  Cross-platform targets (${crossProjects.length} project(s)):`));
    console.log(`    ${c.dim(`cpu: ${[...VALID_CPU].join(", ")}`)}`);
    console.log(`    ${c.dim(`os:  ${[...VALID_OS].join(", ")}`)}`);
    console.log();
    for (const p of crossProjects) {
      const cpuOk = p.targetCpu === "-" || VALID_CPU.has(p.targetCpu);
      const osOk = p.targetOs === "-" || VALID_OS.has(p.targetOs);
      const cpuStr = p.targetCpu !== "-" ? (cpuOk ? p.targetCpu : c.red(p.targetCpu)) : c.dim("native");
      const osStr = p.targetOs !== "-" ? (osOk ? p.targetOs : c.red(p.targetOs)) : c.dim("native");
      const status = cpuOk && osOk ? c.green("OK") : c.red("INVALID");
      console.log(`    ${p.folder.padEnd(28)} ${cpuStr}/${osStr}  ${status}`);
    }
  }

  // Linker strategy distribution (v1.3.2: configVersion determines default)
  const withLock = withPkg.filter((p) => p.lock !== "none");
  if (withLock.length > 0) {
    console.log();
    console.log(c.bold(`  Linker strategy (${withLock.length} projects with lockfile):`));
    console.log();

    // Decision matrix (Bun v1.3.2 rules)
    console.log(`    ${c.dim("configVersion")}  ${c.dim("Workspaces?")}  ${c.dim("Default Linker")}`);
    console.log(`    ${c.cyan("0")}              ${c.dim("any")}          hoisted ${c.dim("(backward compat)")}`);
    console.log(`    ${c.cyan("1")}              no           hoisted`);
    console.log(`    ${c.cyan("1")}              yes          ${c.cyan("isolated")}`);
    console.log();

    const cv0 = withLock.filter((p) => p.configVersion === 0).length;
    const cv1 = withLock.filter((p) => p.configVersion === 1).length;
    const cvUnknown = withLock.filter((p) => p.configVersion === -1).length;
    console.log(`    ${c.cyan("configVersion".padEnd(18))} ${c.dim("v0=")}${cv0}  ${c.dim("v1=")}${cv1}${cvUnknown > 0 ? `  ${c.dim("unknown=")}${cvUnknown}` : ""}`);

    const hoisted = withLock.filter((p) => effectiveLinker(p).strategy === "hoisted").length;
    const isolated = withLock.filter((p) => effectiveLinker(p).strategy === "isolated").length;
    console.log(`    ${c.cyan("effective".padEnd(18))} hoisted=${hoisted}  ${isolated > 0 ? c.cyan(`isolated=${isolated}`) : `isolated=${isolated}`}`);

    const explicit = withLock.filter((p) => p.linker !== "-").length;
    if (explicit > 0) {
      console.log(`    ${c.cyan("explicit bunfig".padEnd(18))} ${explicit} project(s) override configVersion default`);
    }
  }

  if (withoutPkg.length > 0) {
    console.log();
    console.log(c.dim(`  ${withoutPkg.length} directories without package.json: ${withoutPkg.map((p) => p.folder).join(", ")}`));
  }

  // Per-project breakdown
  if (issues.length > 0) {
    console.log();
    console.log(c.bold("  Projects with missing fields:"));
    console.log();
    for (const row of issues) {
      console.log(`    ${c.yellow(row.folder.padEnd(30))} ${row.missing}`);
    }
  } else {
    console.log();
    console.log(c.green("  All projects have complete metadata!"));
  }

  console.log();

  // Hint about --fix
  const fixableMeta = withPkg.filter((p) => p.author === "-" || p.license === "-").length;
  const fixableInit = withoutPkg.length;
  const totalFixable = fixableMeta + fixableInit;
  if (totalFixable > 0) {
    const parts: string[] = [];
    if (fixableMeta > 0) parts.push(`patch ${fixableMeta} package.json(s)`);
    if (fixableInit > 0) parts.push(`init ${fixableInit} missing package.json(s) + bun install`);
    console.log(c.dim(`  Tip: run with --fix to ${parts.join(" & ")}`));
    console.log(c.dim(`       run with --fix --dry-run to preview changes first`));
    console.log();
  }
}

// ── Fix: write missing defaults + init missing package.json ─────────────
async function fixProjects(projects: ProjectInfo[], dryRun: boolean) {
  const patchable = projects.filter((p) => p.hasPkg && (p.author === "-" || p.license === "-"));
  const initable = projects.filter((p) => !p.hasPkg);

  if (patchable.length === 0 && initable.length === 0) {
    console.log(c.green("\n  Nothing to fix — all projects have package.json with author + license.\n"));
    return;
  }

  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Fixing"}`)));
  console.log(c.dim(`  Defaults: author="${DEFAULTS.author}", license="${DEFAULTS.license}"`));

  // ── Patch existing package.json files ────────────────────────────
  if (patchable.length > 0) {
    console.log();
    console.log(c.bold(`  Patching ${patchable.length} existing package.json(s):`));
    console.log();

    let patched = 0;
    for (const p of patchable) {
      const pkgPath = `${PROJECTS_ROOT}/${p.folder}/package.json`;
      try {
        const pkg = await Bun.file(pkgPath).json();
        const changes: string[] = [];

        if (!pkg.author)  { pkg.author = DEFAULTS.author; changes.push("author"); }
        if (!pkg.license) { pkg.license = DEFAULTS.license; changes.push("license"); }

        if (changes.length === 0) continue;
        const label = changes.map((f) => c.green(`+${f}`)).join(" ");

        if (dryRun) {
          console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} ${label}`);
        } else {
          await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
          console.log(`    ${c.green("FIX")} ${p.folder.padEnd(30)} ${label}`);
          patched++;
        }
      } catch {
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} could not read/write package.json`);
      }
    }
    if (!dryRun) console.log(c.dim(`\n  Patched ${patched} file(s).`));
  }

  // ── Init missing package.json + bun install ──────────────────────
  if (initable.length > 0) {
    console.log();
    console.log(c.bold(`  Initializing ${initable.length} project(s) without package.json:`));
    console.log();

    let inited = 0;
    for (const p of initable) {
      const dir = `${PROJECTS_ROOT}/${p.folder}`;
      const pkgPath = `${dir}/package.json`;
      const pkg = {
        name: p.folder,
        version: "0.1.0",
        author: DEFAULTS.author,
        license: DEFAULTS.license,
        description: "",
      };

      if (dryRun) {
        console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} ${c.green("+package.json")} ${c.cyan("+bun install")}`);
        continue;
      }

      try {
        await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
        console.log(`    ${c.green("NEW")} ${p.folder.padEnd(30)} ${c.green("+package.json")}`);

        // Run bun install to generate lock file
        const proc = Bun.spawn(["bun", "install"], { cwd: dir, stdout: "pipe", stderr: "pipe" });
        const exitCode = await proc.exited;
        if (exitCode === 0) {
          console.log(`    ${c.cyan("  ↳")} ${p.folder.padEnd(30)} ${c.cyan("bun install ✓")}`);
        } else {
          const stderr = await proc.stderr.text();
          console.log(`    ${c.yellow("  ↳")} ${p.folder.padEnd(30)} bun install exited ${exitCode}: ${stderr.trim().split("\n")[0]}`);
        }
        inited++;
      } catch (err) {
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} ${err}`);
      }
    }
    if (!dryRun) console.log(c.dim(`\n  Initialized ${inited} project(s).`));
  }

  console.log();
  if (dryRun) {
    console.log(c.dim(`  Run without --dry-run to apply changes.`));
    console.log();
  }
}

// ── Fix Engine: unify engines.bun across all projects ──────────────────
async function fixEngine(projects: ProjectInfo[], dryRun: boolean) {
  const bunVersion = Bun.version;
  const target = `>=${bunVersion}`;
  const withPkg = projects.filter((p) => p.hasPkg);
  const needsFix = withPkg.filter((p) => p.engine !== target);

  if (needsFix.length === 0) {
    console.log(c.green(`\n  All ${withPkg.length} projects already have engines.bun = "${target}".\n`));
    return;
  }

  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Unifying"} engines.bun → "${target}"`)));
  console.log(c.dim(`  ${needsFix.length}/${withPkg.length} projects need updating`));
  console.log();

  let updated = 0;

  for (const p of needsFix) {
    const pkgPath = `${PROJECTS_ROOT}/${p.folder}/package.json`;
    try {
      const pkg = await Bun.file(pkgPath).json();
      const old = pkg.engines?.bun ?? "(none)";

      if (!pkg.engines) pkg.engines = {};
      pkg.engines.bun = target;

      const label = old === "(none)"
        ? c.green(`+engines.bun = "${target}"`)
        : `${c.dim(old)} → ${c.green(target)}`;

      if (dryRun) {
        console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} ${label}`);
      } else {
        await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
        console.log(`    ${c.green("FIX")} ${p.folder.padEnd(30)} ${label}`);
        updated++;
      }
    } catch {
      console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} could not read/write package.json`);
    }
  }

  console.log();
  if (dryRun) {
    console.log(c.dim(`  Run without --dry-run to apply.`));
  } else {
    console.log(c.green(`  Updated ${updated} package.json file(s) to engines.bun = "${target}".`));
  }
  console.log();
}

// ── Fix Scopes: inject [install.scopes] into bunfig.toml ─────────────
// Usage: --fix-scopes https://npm.factory-wager.com @factorywager @duoplus
async function fixScopes(projects: ProjectInfo[], registryUrl: string, scopeNames: string[], dryRun: boolean) {
  const url = (registryUrl.startsWith("http") ? registryUrl : `https://${registryUrl}`).replace(/\/+$/, "") + "/";
  const withPkg = projects.filter((p) => p.hasPkg);

  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Configuring"} scoped registries → ${url}`)));
  console.log(c.dim(`  Scopes: ${scopeNames.join(", ")}`));
  console.log(c.dim(`  ${withPkg.length} projects | token via $FW_REGISTRY_TOKEN`));
  console.log();

  // Build the [install.scopes] TOML block
  const scopeLines = scopeNames
    .map((s) => `"${s}" = { token = "$FW_REGISTRY_TOKEN", url = "${url}" }`)
    .join("\n");
  const scopeBlock = `[install.scopes]\n${scopeLines}`;

  let updated = 0;
  let created = 0;

  for (const p of withPkg) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;
    const bunfigPath = `${dir}/bunfig.toml`;
    const bunfigFile = Bun.file(bunfigPath);
    const exists = await bunfigFile.exists();
    const changes: string[] = [];

    if (exists) {
      try {
        let toml = await bunfigFile.text();
        const hasScopes = toml.includes("[install.scopes]");

        if (hasScopes) {
          // Check if all requested scopes are already present
          const missing = scopeNames.filter((s) => !toml.includes(`"${s}"`));
          if (missing.length === 0) continue; // already fully configured

          // Append missing scopes into existing section
          const insertLines = missing
            .map((s) => `"${s}" = { token = "$FW_REGISTRY_TOKEN", url = "${url}" }`)
            .join("\n");
          toml = toml.replace(
            /(\[install\.scopes\]\s*\n)/,
            `$1${insertLines}\n`
          );
          changes.push(`+scopes: ${c.green(missing.join(", "))}`);
        } else {
          // Append entire [install.scopes] section
          toml = toml.trimEnd() + "\n\n" + scopeBlock + "\n";
          changes.push(`+${c.green("[install.scopes]")}: ${scopeNames.join(", ")}`);
        }

        if (!dryRun) {
          await Bun.write(bunfigPath, toml);
          updated++;
        }
      } catch {
        changes.push(c.red("read/write error"));
      }
    } else {
      // No bunfig.toml — create one with scopes
      changes.push(`${c.green("+bunfig.toml")} with ${scopeNames.join(", ")}`);
      if (!dryRun) {
        await Bun.write(bunfigPath, scopeBlock + "\n");
        created++;
      }
    }

    if (changes.length > 0) {
      const tag = dryRun ? c.yellow("DRY") : c.green("FIX");
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${changes.join("  ")}`);
    }
  }

  console.log();
  if (dryRun) {
    console.log(c.dim("  Run without --dry-run to apply."));
  } else {
    console.log(c.green(`  Updated ${updated} bunfig.toml(s), created ${created} new.`));
    console.log(c.dim(`  Set $FW_REGISTRY_TOKEN env var for auth.`));
  }
  console.log();
}

// ── Fix Npmrc: rewrite .npmrc with scoped v1.3.5+ template ───────────
// Usage: --fix-npmrc https://npm.factory-wager.com @factorywager @duoplus
async function fixNpmrc(projects: ProjectInfo[], registryUrl: string, scopeNames: string[], dryRun: boolean) {
  const url = (registryUrl.startsWith("http") ? registryUrl : `https://${registryUrl}`).replace(/\/+$/, "") + "/";
  const display = url.replace(/^https?:\/\//, "");
  const withPkg = projects.filter((p) => p.hasPkg);

  // Build the template
  const scopeLines = scopeNames
    .map((s) => `${s}:registry=${url}`)
    .join("\n");
  const template = [
    scopeLines,
    "",
    "always-auth=true",
    "",
    `//${display}:_authToken=\${FW_REGISTRY_TOKEN?}`,
    "",
  ].join("\n");

  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Rewriting"} .npmrc → v1.3.5+ scoped template`)));
  console.log(c.dim(`  Registry: ${url}`));
  console.log(c.dim(`  Scopes: ${scopeNames.join(", ")}`));
  console.log(c.dim(`  Token: \${FW_REGISTRY_TOKEN?} (graceful undefined)`));
  console.log(c.dim(`  ${withPkg.length} projects`));
  console.log();

  let updated = 0;
  let created = 0;

  for (const p of withPkg) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;
    const npmrcPath = `${dir}/.npmrc`;
    const npmrcFile = Bun.file(npmrcPath);
    const exists = await npmrcFile.exists();

    let action: string;
    if (exists) {
      const current = await npmrcFile.text();
      if (current.includes("${FW_REGISTRY_TOKEN?}") && current.includes("always-auth")) {
        continue; // already v1.3.5+ template
      }
      action = `${c.yellow("rewrite")} → scoped + \${FW_REGISTRY_TOKEN?}`;
      if (!dryRun) { await Bun.write(npmrcPath, template); updated++; }
    } else {
      action = `${c.green("+new")} scoped + \${FW_REGISTRY_TOKEN?}`;
      if (!dryRun) { await Bun.write(npmrcPath, template); created++; }
    }

    const tag = dryRun ? c.yellow("DRY") : c.green("FIX");
    console.log(`    ${tag} ${p.folder.padEnd(30)} ${action}`);
  }

  console.log();
  if (dryRun) {
    console.log(c.dim("  Run without --dry-run to apply."));
  } else {
    console.log(c.green(`  Rewrote ${updated}, created ${created} .npmrc file(s).`));
    console.log(c.dim(`  Set $FW_REGISTRY_TOKEN env var for auth.`));
  }
  console.log();
}

// ── Fix Registry: unify registry across all projects ─────────────────
// Updates: bunfig.toml [install] + [publish], package.json publishConfig, .npmrc auth
async function fixRegistry(projects: ProjectInfo[], registryUrl: string, dryRun: boolean) {
  // Normalize: ensure https:// prefix, strip trailing slash
  const url = (registryUrl.startsWith("http") ? registryUrl : `https://${registryUrl}`).replace(/\/+$/, "");
  const display = url.replace(/^https?:\/\//, "");
  const withPkg = projects.filter((p) => p.hasPkg);

  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Unifying"} registry → ${url}`)));
  console.log(c.dim(`  ${withPkg.length} projects with package.json`));
  console.log(c.dim(`  Targets: bunfig.toml [install] + [publish], package.json publishConfig, .npmrc auth`));
  console.log();

  let updatedPkg = 0;
  let updatedBunfig = 0;
  let updatedNpmrc = 0;

  for (const p of withPkg) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;
    const changes: string[] = [];

    // ── 1. package.json publishConfig.registry ──────────────
    const pkgPath = `${dir}/package.json`;
    try {
      const pkg = await Bun.file(pkgPath).json();
      const oldReg = pkg.publishConfig?.registry;
      if (oldReg !== url) {
        if (!pkg.publishConfig) pkg.publishConfig = {};
        pkg.publishConfig.registry = url;
        const label = oldReg
          ? `${c.dim(oldReg.replace(/^https?:\/\//, ""))} → ${c.green(display)}`
          : c.green(`+publishConfig.registry`);
        changes.push(`pkg: ${label}`);
        if (!dryRun) {
          await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
          updatedPkg++;
        }
      }
    } catch {
      changes.push(`pkg: ${c.red("read/write error")}`);
    }

    // ── 2. bunfig.toml [install] + [publish] registry ──────
    const bunfigPath = `${dir}/bunfig.toml`;
    const bunfigFile = Bun.file(bunfigPath);
    if (await bunfigFile.exists()) {
      try {
        let toml = await bunfigFile.text();
        let bunfigChanged = false;

        // [install] registry
        const installMatch = toml.match(/^\[install\]\s*\n([\s\S]*?)(?=^\[|$)/m);
        const installRegMatch = toml.match(/^(\s*registry\s*=\s*)"([^"]+)"/m);
        if (installRegMatch && installRegMatch[2] !== url) {
          toml = toml.replace(
            /^(\s*registry\s*=\s*)"[^"]+"/m,
            `$1"${url}"`
          );
          changes.push(`bunfig[install]: ${c.dim(installRegMatch[2].replace(/^https?:\/\//, ""))} → ${c.green(display)}`);
          bunfigChanged = true;
        } else if (!installRegMatch) {
          if (toml.includes("[install]")) {
            toml = toml.replace(/(\[install\]\s*\n)/, `$1registry = "${url}"\n`);
          } else {
            toml += `\n[install]\nregistry = "${url}"\n`;
          }
          changes.push(`bunfig[install]: ${c.green("+registry")}`);
          bunfigChanged = true;
        }

        // [publish] registry
        const publishSection = toml.match(/^\[publish\]\s*\n([\s\S]*?)(?=^\[|$)/m);
        const publishRegMatch = publishSection?.[1]?.match(/registry\s*=\s*"([^"]+)"/);
        if (publishSection && publishRegMatch && publishRegMatch[1] !== url) {
          toml = toml.replace(
            /(\[publish\]\s*\n[\s\S]*?)registry\s*=\s*"[^"]+"/m,
            `$1registry = "${url}"`
          );
          changes.push(`bunfig[publish]: ${c.dim(publishRegMatch[1].replace(/^https?:\/\//, ""))} → ${c.green(display)}`);
          bunfigChanged = true;
        } else if (!publishSection) {
          toml += `\n[publish]\nregistry = "${url}"\n`;
          changes.push(`bunfig[publish]: ${c.green("+section")}`);
          bunfigChanged = true;
        } else if (publishSection && !publishRegMatch) {
          toml = toml.replace(/(\[publish\]\s*\n)/, `$1registry = "${url}"\n`);
          changes.push(`bunfig[publish]: ${c.green("+registry")}`);
          bunfigChanged = true;
        }

        if (bunfigChanged && !dryRun) {
          await Bun.write(bunfigPath, toml);
          updatedBunfig++;
        }
      } catch {
        changes.push(`bunfig: ${c.red("read/write error")}`);
      }
    }

    // ── 3. .npmrc auth token ────────────────────────────────
    const npmrcPath = `${dir}/.npmrc`;
    const npmrcFile = Bun.file(npmrcPath);
    const authLine = `//${display}/:_authToken=\${REGISTRY_TOKEN}`;
    const npmrcExists = await npmrcFile.exists();
    if (npmrcExists) {
      try {
        const content = await npmrcFile.text();
        if (!content.includes(`//${display}/`)) {
          const updated = content.trimEnd() + "\n" + authLine + "\n";
          changes.push(`.npmrc: ${c.green("+auth")}`);
          if (!dryRun) {
            await Bun.write(npmrcPath, updated);
            updatedNpmrc++;
          }
        }
      } catch {
        changes.push(`.npmrc: ${c.red("read/write error")}`);
      }
    } else {
      changes.push(`.npmrc: ${c.green("+new")}`);
      if (!dryRun) {
        await Bun.write(npmrcPath, authLine + "\n");
        updatedNpmrc++;
      }
    }

    if (changes.length > 0) {
      const tag = dryRun ? c.yellow("DRY") : c.green("FIX");
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${changes.join("  ")}`);
    }
  }

  console.log();
  if (dryRun) {
    console.log(c.dim(`  Run without --dry-run to apply.`));
    console.log(c.dim(`  Set $REGISTRY_TOKEN env var for auth before publishing.`));
  } else {
    console.log(c.green(`  Updated ${updatedPkg} package.json(s), ${updatedBunfig} bunfig.toml(s), ${updatedNpmrc} .npmrc(s) → ${url}`));
    console.log(c.dim(`  Set $REGISTRY_TOKEN env var, then: bun publish --dry-run (to verify)`));
  }
  console.log();
}

// ── Fix Trusted: detect native deps and add to trustedDependencies ────
// Scans node_modules for packages with lifecycle scripts, heuristic-matches
// native dep patterns, and writes to package.json trustedDependencies.
const NATIVE_PATTERN = /napi|prebuild|node-gyp|node-pre-gyp|ffi-napi|binding\.gyp|cmake-js|cargo-cp-artifact/i;

async function fixTrusted(projects: ProjectInfo[], dryRun: boolean) {
  const withPkg = projects.filter((p) => p.hasPkg);
  const hooks = ["preinstall", "postinstall", "preuninstall", "prepare", "preprepare", "postprepare", "prepublishOnly"];

  console.log();
  console.log(c.bold(c.cyan(`  ${dryRun ? "Dry Run" : "Fixing"} trustedDependencies`)));
  console.log(c.dim(`  Scanning node_modules for native deps with lifecycle scripts`));
  console.log(c.dim(`  Heuristic: ${NATIVE_PATTERN.source}`));
  console.log();

  let totalUpdated = 0;
  let totalDetected = 0;

  for (const p of withPkg) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;
    const nmDir = `${dir}/node_modules`;
    let entries: string[] = [];
    try { entries = await readdir(nmDir); } catch { continue; }

    const existing = new Set(p.trustedDeps);
    const detected: string[] = [];

    // Scan helper: check a package for lifecycle scripts + native pattern
    const checkPkg = async (pkgName: string, pkgJsonPath: string) => {
      try {
        const pkg = await Bun.file(pkgJsonPath).json();
        const scripts = pkg.scripts ?? {};
        const hasLifecycle = hooks.some((h) => !!scripts[h]);
        if (!hasLifecycle) return;

        // Match by package name OR by script content referencing native tools
        const scriptValues = Object.values(scripts).join(" ");
        if (NATIVE_PATTERN.test(pkgName) || NATIVE_PATTERN.test(scriptValues)) {
          if (!existing.has(pkgName)) {
            detected.push(pkgName);
          }
        }
      } catch {}
    };

    for (const entry of entries) {
      if (entry.startsWith("@")) {
        let scoped: string[] = [];
        try { scoped = await readdir(`${nmDir}/${entry}`); } catch { continue; }
        for (const sub of scoped) {
          await checkPkg(`${entry}/${sub}`, `${nmDir}/${entry}/${sub}/package.json`);
        }
        continue;
      }
      await checkPkg(entry, `${nmDir}/${entry}/package.json`);
    }

    if (detected.length === 0) continue;
    totalDetected += detected.length;

    const merged = [...new Set([...p.trustedDeps, ...detected])].sort();

    if (dryRun) {
      console.log(`    ${c.yellow("DRY")} ${p.folder.padEnd(30)} +${detected.length} native: ${c.dim(detected.join(", "))}`);
    } else {
      const pkgPath = `${dir}/package.json`;
      try {
        const pkg = await Bun.file(pkgPath).json();
        pkg.trustedDependencies = merged;
        await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
        console.log(`    ${c.green("FIX")} ${p.folder.padEnd(30)} +${detected.length} native: ${c.dim(detected.join(", "))}`);
        totalUpdated++;
      } catch {
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} could not write package.json`);
      }
    }
  }

  console.log();
  if (totalDetected === 0) {
    console.log(c.green(`  No new native deps detected across ${withPkg.length} projects.`));
    console.log(c.dim(`  Existing trustedDependencies are up to date.`));
  } else if (dryRun) {
    console.log(c.dim(`  ${totalDetected} native dep(s) detected. Run without --dry-run to apply.`));
  } else {
    console.log(c.green(`  Updated ${totalUpdated} package.json(s) with ${totalDetected} native dep(s).`));
  }
  console.log();
}

// ── Why: run `bun why <pkg>` across all projects ───────────────────────
async function whyAcrossProjects(projects: ProjectInfo[], pkg: string, opts: { top?: boolean; depth?: string }) {
  const withLock = projects.filter((p) => p.lock !== "none");

  const flagParts: string[] = [];
  if (opts.top) flagParts.push("--top");
  if (opts.depth) flagParts.push(`--depth ${opts.depth}`);
  const flagStr = flagParts.length > 0 ? ` ${flagParts.join(" ")}` : "";

  console.log();
  console.log(c.bold(c.cyan(`  bun why ${pkg}${flagStr}`)) + c.dim(` — scanning ${withLock.length} projects with lock files`));
  console.log();

  type WhyHit = { folder: string; versions: string[]; depType: string; directBy: string };
  const hits: WhyHit[] = [];

  for (const p of withLock) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;
    const args = ["bun", "why", pkg];
    if (opts.top) args.push("--top");
    if (opts.depth) args.push("--depth", opts.depth);
    const proc = Bun.spawn(args, { cwd: dir, stdout: "pipe", stderr: "pipe" });
    const exitCode = await proc.exited;
    const stdout = await proc.stdout.text();
    const trimmed = stdout.trim();

    if (exitCode === 0 && trimmed.length > 0) {
      const lines = trimmed.split("\n");
      const clean = lines.map(stripAnsi);

      // Collect all resolved versions: lines matching "pkgname@version"
      const versions = [...new Set(
        clean.filter((l) => /@\S+/.test(l) && !l.includes("(requires"))
             .map((l) => l.match(/@(\S+)/)?.[1])
             .filter(Boolean) as string[]
      )];

      // Determine dep type from Bun's markers (dev, peer, optional peer, or production)
      const isDirect = clean.some((l) => l.includes(p.name) && l.includes("(requires"));
      const hasOptionalPeer = clean.some((l) => /optional peer\s/.test(l));
      const hasDev = clean.some((l) => /(?:├─|└─)\s+dev\s/.test(l));
      const hasPeer = clean.some((l) => /(?:├─|└─)\s+peer\s/.test(l));
      const depType = isDirect ? (hasDev ? "dev" : "direct")
        : hasOptionalPeer ? "optional"
        : hasPeer ? "peer"
        : hasDev ? "dev"
        : "transitive";

      // Extract top-level requirer from first "(requires" line
      const reqLine = clean.find((l) => l.includes("(requires"));
      let directBy = "-";
      if (reqLine) {
        const m = reqLine.match(/(?:├─|└─)\s+(?:(?:dev|peer|optional peer)\s+)?(.+?)(?:@|\s*\()/);
        if (m) directBy = m[1].trim();
      }

      hits.push({ folder: p.folder, versions, depType, directBy });

      console.log(c.bold(c.green(`  ┌─ ${p.folder}`)));
      for (const line of lines) {
        console.log(c.dim("  │ ") + line);
      }
      console.log(c.dim("  └─"));
      console.log();
    }
  }

  if (hits.length === 0) {
    console.log(c.yellow(`  "${pkg}" not found in any project.`));
    console.log();
    return;
  }

  // Summary table
  console.log(c.bold("  Summary"));
  console.log();
  console.log(`    ${c.cyan("Project".padEnd(32))} ${"Version".padEnd(16)} ${"Type".padEnd(12)} Required By`);
  for (const h of hits) {
    const typeColor = h.depType === "direct" ? c.green
      : h.depType === "dev" ? c.magenta
      : h.depType === "peer" ? c.yellow
      : h.depType === "optional" ? c.cyan
      : c.dim;
    const verStr = h.versions.length <= 2 ? h.versions.join(", ") : `${h.versions[0]} +${h.versions.length - 1}`;
    console.log(`    ${h.folder.padEnd(32)} ${verStr.padEnd(16)} ${typeColor(h.depType.padEnd(12))} ${c.dim(h.directBy)}`);
  }
  console.log();
  // Version spread
  const allVersions = [...new Set(hits.flatMap((h) => h.versions))].sort();
  if (allVersions.length > 1) {
    console.log(c.dim(`  ${allVersions.length} versions in use: ${allVersions.join(", ")}`));
  }
  console.log(c.dim(`  Found in ${hits.length} project(s).`));
  console.log();
}

// ── Outdated: run `bun outdated` across all projects ───────────────────
type OutdatedOpts = { filter?: string[]; production?: boolean; omit?: string; global?: boolean; catalog?: boolean; wf?: string[] };

async function outdatedAcrossProjects(projects: ProjectInfo[], opts: OutdatedOpts) {
  // With -r (catalog) or --wf, only scan workspace roots; otherwise all projects with locks
  const candidates = (opts.catalog || opts.wf?.length)
    ? projects.filter((p) => p.workspace && p.lock !== "none")
    : projects.filter((p) => p.lock !== "none");

  // Build display label
  const parts: string[] = [];
  if (opts.catalog) parts.push("-r");
  if (opts.wf?.length) parts.push(opts.wf.map((w) => `--filter '${w}'`).join(" "));
  if (opts.filter?.length) parts.push(opts.filter.join(" "));
  if (opts.production) parts.push("--production");
  if (opts.omit) parts.push(`--omit ${opts.omit}`);
  if (opts.global) parts.push("--global");
  const flagStr = parts.length > 0 ? ` ${parts.join(" ")}` : "";

  console.log();
  console.log(c.bold(c.cyan("  bun outdated")) + (flagStr ? c.yellow(flagStr) : "") + c.dim(` — checking ${candidates.length} project(s)`));
  console.log();

  type ProjectHit = { folder: string; pkgs: OutdatedPkg[] };
  const hits: ProjectHit[] = [];
  let projectsWithOutdated = 0;

  for (const p of candidates) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;

    // bun ≤1.3 breaks with multiple --filter flags — run separate calls and merge
    const wfList = opts.wf?.length ? opts.wf : [undefined];
    let pkgs: OutdatedPkg[] = [];

    for (const wf of wfList) {
      const args = ["bun", "outdated", ...(opts.filter ?? [])];
      if (opts.catalog) args.push("-r");
      if (wf) args.push("--filter", wf);
      if (opts.global) args.push("--global");
      const proc = Bun.spawn(args, { cwd: dir, stdout: "pipe", stderr: "pipe" });
      await proc.exited;
      const stdout = await proc.stdout.text();
      if (stdout.trim().length > 0) pkgs.push(...parseBunOutdated(stdout));
    }

    // Dedupe by name+workspace (multiple --wf runs can overlap via catalogs)
    const seen = new Set<string>();
    pkgs = pkgs.filter((pkg) => {
      const key = `${pkg.name}@${pkg.current}:${pkg.workspace ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Apply dep type filters (bun ≤1.3 doesn't filter outdated by type)
    if (opts.production) pkgs = pkgs.filter((pkg) => pkg.depType === "prod");
    if (opts.omit) {
      const omitTypes = opts.omit.split(",").map((s) => s.trim());
      pkgs = pkgs.filter((pkg) => !omitTypes.includes(pkg.depType));
    }

    if (pkgs.length > 0) {
      projectsWithOutdated++;
      console.log(c.bold(c.yellow(`  ┌─ ${p.folder}`)));
      const maxName = Math.max(...pkgs.map((pkg) => pkg.name.length + (pkg.depType !== "prod" ? pkg.depType.length + 3 : 0)));
      const maxCur = Math.max(7, ...pkgs.map((pkg) => pkg.current.length));
      const maxUpd = Math.max(6, ...pkgs.map((pkg) => pkg.update.length));
      const maxLat = Math.max(6, ...pkgs.map((pkg) => pkg.latest.length));
      for (const pkg of pkgs) {
        const label = pkg.depType !== "prod" ? `${pkg.name} ${c.dim(`(${pkg.depType})`)}` : pkg.name;
        const padName = pkg.depType !== "prod" ? pkg.name.length + pkg.depType.length + 3 : pkg.name.length;
        const wsCol = pkg.workspace ? `  ${c.cyan(pkg.workspace)}` : "";
        console.log(c.dim("  │ ") + `  ${label}${"".padEnd(maxName - padName)}  ${c.dim(pkg.current.padEnd(maxCur))}  ${pkg.update.padEnd(maxUpd)}  ${pkg.current === pkg.latest ? c.green(pkg.latest) : c.yellow(pkg.latest)}${wsCol}`);
      }
      console.log(c.dim("  └─"));
      console.log();
      hits.push({ folder: p.folder, pkgs });
    }
  }

  if (projectsWithOutdated === 0) {
    console.log(c.green(opts.filter?.length ? `  No outdated packages matching ${opts.filter.join(" ")}.` : "  All projects are up to date!"));
  } else {
    console.log(c.dim(`  ${projectsWithOutdated}/${candidates.length} project(s) have outdated dependencies.`));
  }

  // Summary table
  if (hits.length > 0) {
    // Aggregate by package name
    const byPkg = new Map<string, { projects: string[]; depType: string; currents: Set<string>; latest: string; workspaces: Set<string> }>();
    for (const h of hits) {
      for (const pkg of h.pkgs) {
        let entry = byPkg.get(pkg.name);
        if (!entry) {
          entry = { projects: [], depType: pkg.depType, currents: new Set(), latest: pkg.latest, workspaces: new Set() };
          byPkg.set(pkg.name, entry);
        }
        entry.projects.push(h.folder);
        entry.currents.add(pkg.current);
        if (pkg.latest > entry.latest) entry.latest = pkg.latest;
        if (pkg.workspace) entry.workspaces.add(pkg.workspace);
      }
    }

    console.log();
    console.log(c.bold("  Summary"));
    console.log();
    const hasWs = [...byPkg.values()].some((v) => v.workspaces.size > 0);
    const hdr = `    ${c.cyan("Package".padEnd(32))} ${"Type".padEnd(6)} ${"Current".padEnd(20)} ${"Latest".padEnd(12)} ${hasWs ? "Workspace".padEnd(20) : ""}Projects`;
    const sep = `    ${"─".repeat(32)} ${"─".repeat(6)} ${"─".repeat(20)} ${"─".repeat(12)} ${hasWs ? "─".repeat(20) + " " : ""}${"─".repeat(8)}`;
    console.log(hdr);
    console.log(sep);

    const sorted = [...byPkg.entries()].sort((a, b) => b[1].projects.length - a[1].projects.length);
    for (const [name, info] of sorted) {
      const currents = [...info.currents].sort();
      const curStr = currents.length <= 2 ? currents.join(", ") : `${currents[0]} +${currents.length - 1}`;
      const allSame = currents.length === 1 && currents[0] === info.latest;
      const latestStr = allSame ? c.green(info.latest) : c.yellow(info.latest);
      const typeColor = info.depType === "dev" ? c.magenta : info.depType === "peer" ? c.yellow : c.green;
      const wsStr = hasWs ? c.cyan([...info.workspaces].join(", ").padEnd(20)) + " " : "";
      console.log(`    ${name.padEnd(32)} ${typeColor(info.depType.padEnd(6))} ${c.dim(curStr.padEnd(20))} ${latestStr.padEnd(12)} ${wsStr}${c.dim(String(info.projects.length))}`);
    }

    console.log();
    const totalPkgs = byPkg.size;
    const totalHits = hits.reduce((s, h) => s + h.pkgs.length, 0);
    console.log(c.dim(`  ${totalPkgs} unique package(s), ${totalHits} total instance(s) across ${hits.length} project(s).`));
  }
  console.log();
}

// ── Update: run `bun update` across all projects ───────────────────────
type UpdateOpts = { dryRun: boolean; patch?: boolean; minor?: boolean };

async function updateAcrossProjects(projects: ProjectInfo[], opts: UpdateOpts) {
  const { dryRun, patch, minor } = opts;
  const semverFilter = patch ? "patch" : minor ? "minor" : null;
  const withLock = projects.filter((p) => p.lock !== "none");

  const label = [
    "bun update",
    semverFilter ? `--${semverFilter}` : "",
    dryRun ? "--dry-run" : "",
  ].filter(Boolean).join(" ");

  console.log();
  console.log(c.bold(c.cyan(`  ${label}`)) + c.dim(` — ${withLock.length} projects`));
  if (semverFilter) {
    const desc = semverFilter === "patch"
      ? "same major.minor, patch bump only"
      : "same major, minor + patch bumps";
    console.log(c.dim(`  Filter: ${desc}`));
  }
  console.log();

  // ── Phase 1: Discovery (silent — stdout piped) ─────────────────
  type UpdatePlan = { project: ProjectInfo; pkgs: OutdatedPkg[]; names: string[] };
  const plans: UpdatePlan[] = [];
  let skipped = 0;

  for (const p of withLock) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;
    const checkProc = Bun.spawn(["bun", "outdated"], { cwd: dir, stdout: "pipe", stderr: "pipe" });
    await checkProc.exited;
    const checkOut = await checkProc.stdout.text();

    if (checkOut.trim().length === 0) {
      skipped++;
      continue;
    }

    let pkgs = parseBunOutdated(checkOut);

    if (semverFilter && pkgs.length > 0) {
      pkgs = pkgs.filter((pkg) => {
        const bump = semverBumpType(pkg.current, pkg.latest);
        if (!bump) return false;
        return semverFilter === "patch" ? bump === "patch" : bump !== "major";
      });
    }

    if (pkgs.length === 0) {
      skipped++;
      continue;
    }

    plans.push({ project: p, pkgs, names: pkgs.map((pkg) => pkg.name) });
  }

  // ── Phase 2: Preview ───────────────────────────────────────────
  let totalPkgs = 0;
  for (const { project: p, pkgs, names } of plans) {
    const isAdd = p.exact && semverFilter;
    const trusted = new Set(p.trustedDeps);
    const extras: string[] = [];
    if (isAdd) extras.push("bun add -E");
    if (isAdd && p.registry !== "-") extras.push("registry");
    if (isAdd && trusted.size > 0) extras.push("trust");
    const method = extras.length > 0 ? c.dim(` (${extras.join(", ")})`) : "";
    const tag = dryRun ? c.yellow("DRY") : c.yellow("...");

    if (semverFilter) {
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${c.dim(`${names.length} ${semverFilter}:`)}${method}`);
      for (const pkg of pkgs) {
        const typeLabel = pkg.depType !== "prod" ? c.dim(` (${pkg.depType})`) : "";
        const trustLabel = trusted.has(pkg.name) ? c.dim(" [trusted]") : "";
        console.log(`         ${"".padEnd(30)} ${pkg.name}${typeLabel} ${c.dim(pkg.current)} → ${c.green(pkg.latest)}${trustLabel}`);
      }
    } else {
      console.log(`    ${tag} ${p.folder.padEnd(30)} ${c.dim(`${pkgs.length} outdated package(s)`)}${method}`);
    }
    totalPkgs += pkgs.length;
  }

  console.log();

  if (plans.length === 0) {
    console.log(c.dim(`  All ${skipped} project(s) ${semverFilter ? `have no ${semverFilter} updates` : "are already up to date"}.`));
    console.log();
    return;
  }

  if (dryRun) {
    console.log(c.dim(`  ${plans.length} project(s) would be updated (${totalPkgs} package(s)), ${skipped} ${semverFilter ? `have no ${semverFilter} updates` : "already up to date"}.`));
    console.log(c.dim(`  Run without --dry-run to apply updates.`));
    console.log();
    return;
  }

  // ── Phase 3: Confirm ───────────────────────────────────────────
  process.stdout.write(c.yellow(`  Apply ${totalPkgs} update(s) across ${plans.length} project(s)? (y/n): `));
  for await (const line of console) {
    if (line.trim().toLowerCase() === "y") break;
    console.log(c.dim("\n  Cancelled."));
    console.log();
    return;
  }
  console.log();

  // ── Phase 4: Execute (stdout inherited — interactive) ──────────
  let updated = 0;
  let interrupted = false;
  let summaryPrinted = false;
  const completedFolders: string[] = [];

  const onSignal = () => {
    if (interrupted) {
      console.log(c.red("\n  Force quit."));
      process.exit(1);
    }
    interrupted = true;
    console.log(c.yellow("\n  Finishing current project… (ctrl+c again to force quit)"));
  };
  process.on("SIGINT", onSignal);
  process.on("SIGTERM", onSignal);

  const onExit = (code: number) => {
    if (summaryPrinted) return;
    console.log();
    console.log(c.yellow(`  Exit (code ${code}) — ${completedFolders.length}/${plans.length} project(s) updated before exit.`));
    if (completedFolders.length > 0) {
      for (const f of completedFolders) console.log(`    ${c.green("OK")}  ${f}`);
    }
  };
  process.on("exit", onExit);

  for (const { project: p, pkgs, names } of plans) {
    if (interrupted) break;

    const dir = `${PROJECTS_ROOT}/${p.folder}`;

    // Exact-pinned projects need `bun add -E pkg@version` since `bun update` respects the pinned range.
    // Group by dep type so dev/optional/peer deps stay in the correct section.
    // Pass --registry when project has a custom registry, --trust for trustedDependencies.
    const useAdd = p.exact && semverFilter;
    if (useAdd) {
      const DEP_FLAG: Record<string, string | undefined> = {
        prod: undefined, dev: "--dev", optional: "--optional", peer: "--peer",
      };
      const trusted = new Set(p.trustedDeps);
      const registryUrl = p.registry !== "-"
        ? (p.registry.startsWith("http") ? p.registry : `https://${p.registry}`)
        : null;

      const groups = new Map<string, OutdatedPkg[]>();
      for (const pkg of pkgs) {
        const key = pkg.depType;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(pkg);
      }

      let ok = true;
      for (const [depType, group] of groups) {
        if (interrupted) { ok = false; break; }

        const specs = group.map((pkg) => `${pkg.name}@${pkg.latest}`);
        const needsTrust = group.some((pkg) => trusted.has(pkg.name));
        const args = ["bun", "add", "--exact", ...specs];
        const flag = DEP_FLAG[depType];
        if (flag) args.splice(3, 0, flag);
        if (registryUrl) args.push("--registry", registryUrl);
        if (needsTrust) args.push("--trust");

        const proc = Bun.spawn(args, { cwd: dir, stdout: "inherit", stderr: "pipe" });
        const exitCode = await proc.exited;
        if (exitCode !== 0) {
          const errText = await proc.stderr.text();
          const errLine = extractBunError(errText, `exit code ${exitCode}`);
          console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} ${errLine}`);
          ok = false;
          break;
        }
      }

      if (ok) {
        const extras: string[] = [];
        if (registryUrl) extras.push("registry");
        if (trusted.size > 0) extras.push("trust");
        const via = extras.length > 0 ? ` [${extras.join(", ")}]` : "";
        console.log(`    ${c.green("UPD")} ${p.folder.padEnd(30)} ${c.dim(`${pkgs.length} ${semverFilter} update(s) via bun add -E${via}`)}`);
        for (const pkg of pkgs) {
          const typeLabel = pkg.depType !== "prod" ? c.dim(` (${pkg.depType})`) : "";
          const trustLabel = trusted.has(pkg.name) ? c.dim(" [trusted]") : "";
          console.log(`         ${"".padEnd(30)} ${pkg.name}${typeLabel} ${c.dim(pkg.current)} → ${c.green(pkg.latest)}${trustLabel}`);
        }
        updated++;
        completedFolders.push(p.folder);
      }
    } else {
      // Standard: bun update (blanket or targeted)
      const args = semverFilter ? ["bun", "update", ...names] : ["bun", "update"];
      const proc = Bun.spawn(args, { cwd: dir, stdout: "inherit", stderr: "pipe" });
      const exitCode = await proc.exited;

      if (exitCode === 0) {
        const detail = semverFilter ? `${names.length} ${semverFilter} update(s)` : "done";
        console.log(`    ${c.green("UPD")} ${p.folder.padEnd(30)} ${c.dim(detail)}`);
        if (semverFilter) {
          for (const pkg of pkgs) {
            console.log(`         ${"".padEnd(30)} ${pkg.name} ${c.dim(pkg.current)} → ${c.green(pkg.latest)}`);
          }
        }
        updated++;
        completedFolders.push(p.folder);
      } else {
        const errText = await proc.stderr.text();
        const errLine = extractBunError(errText, `exit code ${exitCode}`);
        console.log(`    ${c.red("ERR")} ${p.folder.padEnd(30)} ${errLine}`);
      }
    }
  }

  process.off("SIGINT", onSignal);
  process.off("SIGTERM", onSignal);
  process.off("exit", onExit);
  summaryPrinted = true;

  console.log();
  if (interrupted) {
    const remaining = plans.length - updated;
    console.log(c.yellow(`  Interrupted — ${updated} project(s) updated, ${remaining} skipped.`));
    if (completedFolders.length > 0) {
      for (const f of completedFolders) console.log(`    ${c.green("OK")}  ${f}`);
    }
  } else {
    console.log(c.green(`  Updated ${updated} project(s), ${skipped} ${semverFilter ? `have no ${semverFilter} updates` : "already up to date"}.`));
  }
  console.log();
}

// ── Verify: run `bun install --frozen-lockfile` across projects ──────
async function verifyLockfiles(projects: ProjectInfo[]) {
  const withLock = projects.filter((p) => p.lock !== "none");

  console.log();
  console.log(c.bold(c.cyan("  bun install --frozen-lockfile")) + c.dim(` — verifying ${withLock.length} project(s)`));
  console.log();

  let passed = 0;
  let failed = 0;
  const failures: { folder: string; error: string }[] = [];

  for (const p of withLock) {
    const dir = `${PROJECTS_ROOT}/${p.folder}`;
    const proc = Bun.spawn(["bun", "install", "--frozen-lockfile"], { cwd: dir, stdout: "pipe", stderr: "pipe" });
    const exitCode = await proc.exited;

    if (exitCode === 0) {
      console.log(`    ${c.green("PASS")} ${p.folder}`);
      passed++;
    } else {
      const stderr = await proc.stderr.text();
      const errLine = extractBunError(stderr, `exit code ${exitCode}`);
      console.log(`    ${c.red("FAIL")} ${p.folder.padEnd(30)} ${c.dim(errLine)}`);
      failures.push({ folder: p.folder, error: errLine });
      failed++;
    }
  }

  console.log();
  if (failed === 0) {
    console.log(c.green(`  All ${passed} project(s) passed lockfile verification.`));
  } else {
    console.log(c.yellow(`  ${passed} passed, ${c.red(`${failed} failed`)} lockfile verification.`));
    console.log();
    console.log(c.bold("  Failed projects:"));
    for (const f of failures) {
      console.log(`    ${c.red("•")} ${f.folder.padEnd(30)} ${c.dim(f.error)}`);
    }
    console.log();
    console.log(c.dim("  Run `bun install` in failed projects to regenerate lockfiles."));
  }
  console.log();
}

// ── Info: run `bun info <pkg>` and show registry metadata ────────────
async function infoPackage(pkg: string, projects: ProjectInfo[], jsonOut: boolean, property?: string) {
  // Run bun info from a dir that has package.json (bun requires it)
  const cwd = projects.find((p) => p.hasPkg)
    ? `${PROJECTS_ROOT}/${projects.find((p) => p.hasPkg)!.folder}`
    : PROJECTS_ROOT;

  // If a specific property is requested, run bun info <pkg> <property> directly
  if (property) {
    const args = ["bun", "info", pkg, property];
    if (jsonOut) args.push("--json");
    const proc = Bun.spawn(args, { cwd, stdout: "pipe", stderr: "pipe" });
    const exitCode = await proc.exited;
    const stdout = await proc.stdout.text();
    const stderr = await proc.stderr.text();
    if (exitCode !== 0) {
      console.error(c.red(`  bun info ${pkg} ${property}: ${stderr.trim()}`));
      process.exit(1);
    }
    console.log(stdout.trimEnd());
    return;
  }

  const proc = Bun.spawn(["bun", "info", pkg, "--json"], { cwd, stdout: "pipe", stderr: "pipe" });
  const exitCode = await proc.exited;
  const stdout = await proc.stdout.text();
  const stderr = await proc.stderr.text();

  if (exitCode !== 0) {
    console.error(c.red(`  bun info ${pkg} failed: ${stderr.trim().split("\n")[0]}`));
    process.exit(1);
  }

  let meta: any;
  try {
    meta = JSON.parse(stdout);
  } catch {
    // Fallback: non-JSON output, just print it
    console.log(stdout);
    return;
  }

  if (jsonOut) {
    console.log(JSON.stringify(meta, null, 2));
    return;
  }

  // Pretty print
  const line = (label: string, value: string | number | boolean | undefined) =>
    value !== undefined && value !== "" && console.log(`  ${c.cyan(label.padEnd(18))} ${value}`);

  console.log();
  console.log(c.bold(c.magenta(`  ╭─ ${meta.name ?? pkg} ─╮`)));
  console.log();
  line("Name",            meta.name);
  line("Version",         meta.version ?? meta["dist-tags"]?.latest);
  line("Description",     meta.description);
  line("License",         meta.license);
  line("Homepage",        meta.homepage);

  const author = typeof meta.author === "string"
    ? meta.author
    : meta.author?.name ? `${meta.author.name}${meta.author.email ? ` <${meta.author.email}>` : ""}` : undefined;
  line("Author",          author);

  const repo = typeof meta.repository === "string"
    ? meta.repository
    : meta.repository?.url;
  line("Repository",      repo);

  // Dependencies
  const deps = meta.dependencies ? Object.keys(meta.dependencies) : [];
  const devDeps = meta.devDependencies ? Object.keys(meta.devDependencies) : [];
  if (deps.length > 0 || devDeps.length > 0) {
    console.log();
    line("Dependencies",    deps.length || 0);
    line("DevDependencies", devDeps.length || 0);
    if (deps.length > 0 && deps.length <= 15) {
      console.log();
      for (const d of deps) {
        console.log(`    ${c.dim("•")} ${d} ${c.dim(meta.dependencies[d])}`);
      }
    } else if (deps.length > 15) {
      console.log();
      for (const d of deps.slice(0, 12)) {
        console.log(`    ${c.dim("•")} ${d} ${c.dim(meta.dependencies[d])}`);
      }
      console.log(c.dim(`    ... and ${deps.length - 12} more`));
    }
  }

  // dist-tags
  const tags = meta["dist-tags"];
  if (tags && Object.keys(tags).length > 0) {
    console.log();
    console.log(`  ${c.cyan("Dist Tags".padEnd(18))}`);
    for (const [tag, ver] of Object.entries(tags)) {
      console.log(`    ${c.dim("•")} ${tag.padEnd(12)} ${ver}`);
    }
  }

  // Maintainers
  const maintainers = meta.maintainers;
  if (Array.isArray(maintainers) && maintainers.length > 0) {
    console.log();
    console.log(`  ${c.cyan("Maintainers".padEnd(18))}`);
    for (const m of maintainers.slice(0, 8)) {
      const name = typeof m === "string" ? m : m.name ?? m.email ?? JSON.stringify(m);
      console.log(`    ${c.dim("•")} ${name}`);
    }
    if (maintainers.length > 8) console.log(c.dim(`    ... and ${maintainers.length - 8} more`));
  }

  // Cross-reference: which local projects use this package?
  // Strip version qualifier (e.g. react@18.0.0 → react) for local lookup
  const bareName = pkg.replace(/@[^/]+$/, "").replace(/^(@[^/]+\/[^@]+)@.*$/, "$1");
  const localUsers: string[] = [];
  for (const p of projects.filter((p) => p.hasPkg)) {
    try {
      const pkgJson = await Bun.file(`${PROJECTS_ROOT}/${p.folder}/package.json`).json();
      const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
      if (allDeps[bareName]) {
        localUsers.push(`${p.folder} ${c.dim(allDeps[bareName])}`);
      }
    } catch {}
  }

  if (localUsers.length > 0) {
    console.log();
    console.log(`  ${c.cyan("Used Locally".padEnd(18))} ${c.dim(`in ${localUsers.length} project(s)`)}`);
    for (const u of localUsers) {
      console.log(`    ${c.green("•")} ${u}`);
    }
  }

  console.log();
}

// ── Main ───────────────────────────────────────────────────────────────
async function main() {
  // Windows + mise function wrapper: if mise is active but MISE_SHELL isn't set,
  // the PowerShell function wrapper may be mangling argv before bun sees it
  if (shouldWarnMise(process.platform, Bun.env.MISE_SHELL)) {
    console.log(c.dim("  Hint: On Windows, use 'mise.exe' for stable argument parsing."));
    console.log();
  }

  if (flags.help) {
    const ph = platformHelp(process.platform);
    console.log(`
${c.bold(c.cyan("  bun scan.ts"))} — multi-project scanner for $BUN_PLATFORM_HOME

${c.dim("  Usage:")}
    ${ph.cmd} scan.ts [flags]
${ph.hint ? `\n${c.dim("  Tip for PowerShell users:")}\n    ${ph.hint}\n` : ""}
${c.bold("  Modes:")}
    ${c.cyan("(default)")}                          Table of all projects
    ${c.cyan("--detail")}                           Extended table (author, license, description)
    ${c.cyan("--inspect")} <name>                   Deep view of a single project
    ${c.cyan("--json")}                             JSON output
    ${c.cyan("--audit")}                            Metadata + infra + lifecycle security report
    ${c.cyan("--fix")} [--dry-run]                  Patch missing author/license, init missing pkg
    ${c.cyan("--fix-engine")} [--dry-run]           Unify engines.bun across all projects
    ${c.cyan("--fix-registry")} <url> [--dry-run]   Unify registry (bunfig + pkg + .npmrc)
    ${c.cyan("--fix-scopes")} <url> @s.. [--dry-run] Inject [install.scopes] into bunfig.toml
    ${c.cyan("--fix-npmrc")} <url> @s.. [--dry-run] Rewrite .npmrc with scoped template
    ${c.cyan("--fix-trusted")} [--dry-run]          Auto-detect native deps → trustedDependencies
    ${c.cyan("--fix-env-docs")}                     Inject audit recommendations into .env.template
    ${c.cyan("--why")} <pkg> [--top] [--depth N]    bun why across all projects
    ${c.cyan("--outdated")} [-r] [--wf] [-p]        bun outdated across all projects
    ${c.cyan("--update")} [--dry-run]               bun update across all projects
    ${c.cyan("--update --patch")} [--dry-run]       Update patch-level bumps only
    ${c.cyan("--update --minor")} [--dry-run]       Update minor + patch bumps only
    ${c.cyan("--verify")}                           bun install --frozen-lockfile across all projects
    ${c.cyan("--info")} <pkg> [--json]              Registry metadata + local cross-reference
    ${c.cyan("--path")}                             Emit export PATH for projects with bin/

${c.bold("  Filters:")}
    ${c.cyan("--filter")} <glob|bool>               Filter by name, folder, or boolean field
    ${c.cyan("--with-bunfig")}                      Only projects with bunfig.toml
    ${c.cyan("--workspaces")}                       Only workspace roots
    ${c.cyan("--without-pkg")}                      Only dirs missing package.json
    ${c.cyan("--sort")} <key>                       Sort by name, deps, version, lock

${c.bold("  Dependency scope:")}
    ${c.cyan("-p, --production")}                   Exclude devDependencies
    ${c.cyan("-g, --global")}                       Check global packages
    ${c.cyan("-r, --catalog")}                      Catalog dependencies (workspace roots)
    ${c.cyan("--wf")} <workspace>                   Filter by workspace name (repeatable)
    ${c.cyan("--omit")} <type>                      Skip dev, optional, or peer

${c.bold("  Update behavior (exact-pinned projects):")}
    ${c.cyan("--exact")}                            Passed to bun add -E automatically
    ${c.cyan("--dev/--optional/--peer")}             Auto-grouped by dep type
    ${c.cyan("--registry")}                         Passed from project bunfig.toml
    ${c.cyan("--trust")}                            Passed when pkg is in trustedDependencies

${c.bold("  Other:")}
    ${c.cyan("--dry-run")}                          Preview changes without applying
    ${c.cyan("--depth")} <N>                        Depth for --why
    ${c.cyan("--top")}                              Top-level only for --why
    ${c.cyan("--no-ipc")}                           Disable parallel IPC scanning (use Promise.all)
    ${c.cyan("-h, --help")}                         Show this help
`);
    return;
  }

  const t0 = Bun.nanoseconds();

  // Discover project directories (top-level only)
  const entries = await readdir(PROJECTS_ROOT, { withFileTypes: true });
  const dirs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && e.name !== "scanner")
    .map((e) => `${PROJECTS_ROOT}/${e.name}`);

  // Scan all — IPC worker pool for true parallelism, fallback to Promise.all
  let projects: ProjectInfo[];
  if (flags["no-ipc"]) {
    projects = await Promise.all(dirs.map(scanProject));
  } else {
    try {
      projects = await scanProjectsViaIPC(dirs);
    } catch {
      projects = await Promise.all(dirs.map(scanProject));
    }
  }

  // ── Filters ──────────────────────────────────────────────────────
  if (flags["with-bunfig"]) {
    projects = projects.filter((p) => p.bunfig);
  }
  if (flags.workspaces) {
    projects = projects.filter((p) => p.workspace);
  }
  if (flags["without-pkg"]) {
    projects = projects.filter((p) => !p.hasPkg);
  }
  if (flags.filter) {
    projects = projects.filter((p) => matchFilter(p, flags.filter!));
  }

  // ── Sort ─────────────────────────────────────────────────────────
  if (flags.sort) {
    projects = sortProjects(projects, flags.sort);
  } else {
    projects.sort((a, b) => a.folder.localeCompare(b.folder));
  }

  // ── Path mode: emit shell export for projects with bin/ ────────
  if (flags.path) {
    const binDirs = projects
      .filter((p) => p.hasBinDir)
      .map((p) => `${PROJECTS_ROOT}/${p.folder}/bin`);

    if (binDirs.length === 0) {
      console.error("No projects with bin/ directories found.");
      return;
    }

    // Detect common registry across all scanned projects
    const registries = projects
      .map((p) => p.registry)
      .filter((r) => r !== "-");
    const uniqueRegistries = [...new Set(registries)];
    const commonRegistry = uniqueRegistries.length === 1 ? uniqueRegistries[0] : null;

    // stdout: clean export statements, safe to eval
    console.log(`export BUN_PLATFORM_HOME="${PROJECTS_ROOT}"`);
    if (commonRegistry) {
      const fullUrl = commonRegistry.startsWith("http") ? commonRegistry : `https://${commonRegistry}`;
      console.log(`export BUN_CONFIG_REGISTRY="${fullUrl}"`);
    }
    const pathPrefix = binDirs.join(":");
    console.log(`export PATH="${pathPrefix}:$PATH"`);

    // stderr: human-readable summary (won't pollute eval)
    process.stderr.write(`# BUN_PLATFORM_HOME=${PROJECTS_ROOT}\n`);
    if (commonRegistry) {
      process.stderr.write(`# BUN_CONFIG_REGISTRY=https://${commonRegistry} (global override)\n`);
    }
    process.stderr.write(`# ${binDirs.length} project bin/ dirs prepended to PATH:\n`);
    for (const dir of binDirs) {
      process.stderr.write(`#   ${dir}\n`);
    }
    return;
  }

  // ── Snapshot-only mode (no full audit) ─────────────────────────
  if (flags.snapshot && !flags.audit) {
    const xrefResult = await scanXrefData(projects);
    const withPkg = projects.filter((p) => p.hasPkg);
    await saveXrefSnapshot(xrefResult, withPkg.length);
    console.log(`  Snapshot saved to .audit/xref-snapshot.json (${xrefResult.length} projects)`);
    return;
  }

  // ── Compare-only mode (no full audit) ──────────────────────────
  if (flags.compare && !flags.audit) {
    const snapshotPath = flags["audit-compare"] ?? undefined;
    const prevSnapshot = await loadXrefSnapshot(snapshotPath);
    if (!prevSnapshot) {
      const label = snapshotPath ?? ".audit/xref-snapshot.json";
      console.log(`  No snapshot found at ${label} — run --audit or --snapshot first.`);
      process.exit(1);
    }
    const cmpXrefData = await scanXrefData(projects);

    const prevMap = new Map<string, XrefEntry>();
    for (const p of prevSnapshot.projects) prevMap.set(p.folder, p);
    const currentFolders = new Set(cmpXrefData.map((x) => x.folder));
    const prevFolders = new Set(prevSnapshot.projects.map((p) => p.folder));
    const newProjects = cmpXrefData.filter((x) => !prevFolders.has(x.folder));
    const removedProjects = prevSnapshot.projects.filter((p) => !currentFolders.has(p.folder));
    const changedProjects: string[] = [];
    let unchangedCount = 0;
    for (const x of cmpXrefData) {
      const prev = prevMap.get(x.folder);
      if (!prev) continue;
      const diffs: string[] = [];
      const dDef = x.bunDefault.length - prev.bunDefault.length;
      const dExp = x.explicit.length - prev.explicit.length;
      const dBlk = x.blocked.length - prev.blocked.length;
      if (dDef !== 0) diffs.push(`default ${dDef > 0 ? "+" : ""}${dDef}`);
      if (dExp !== 0) diffs.push(`explicit ${dExp > 0 ? "+" : ""}${dExp}`);
      if (dBlk !== 0) diffs.push(`blocked ${dBlk > 0 ? "+" : ""}${dBlk}`);
      if (diffs.length > 0) changedProjects.push(`${x.folder} (${diffs.join(", ")})`);
      else unchangedCount++;
    }

    console.log();
    console.log(c.bold(`  Cross-reference delta (vs ${prevSnapshot.timestamp}):`));
    console.log(`    ${"New projects:".padEnd(18)} ${c.cyan(String(newProjects.length))}${newProjects.length > 0 ? "   " + newProjects.map((x) => x.folder).join(", ") : ""}`);
    console.log(`    ${"Removed:".padEnd(18)} ${removedProjects.length > 0 ? c.red(String(removedProjects.length)) : c.dim(String(removedProjects.length))}${removedProjects.length > 0 ? "   " + removedProjects.map((p) => p.folder).join(", ") : ""}`);
    console.log(`    ${"Changed:".padEnd(18)} ${changedProjects.length > 0 ? c.yellow(String(changedProjects.length)) : c.dim(String(changedProjects.length))}${changedProjects.length > 0 ? "   " + changedProjects.join(", ") : ""}`);
    console.log(`    ${"Unchanged:".padEnd(18)} ${c.dim(String(unchangedCount))}`);
    console.log();
    const hasDrift = newProjects.length > 0 || removedProjects.length > 0 || changedProjects.length > 0;
    if (hasDrift) process.exit(1);
    return;
  }

  // ── Audit mode ──────────────────────────────────────────────────
  if (flags.audit) {
    await renderAudit(projects);
    return;
  }

  // ── Fix mode ───────────────────────────────────────────────────
  if (flags.fix) {
    await fixProjects(projects, !!flags["dry-run"]);
    return;
  }

  // ── Fix engine mode ────────────────────────────────────────────
  if (flags["fix-engine"]) {
    await fixEngine(projects, !!flags["dry-run"]);
    return;
  }

  // ── Fix trusted mode ──────────────────────────────────────────
  if (flags["fix-trusted"]) {
    await fixTrusted(projects, !!flags["dry-run"]);
    return;
  }

  // ── Fix env docs mode ────────────────────────────────────────
  if (flags["fix-env-docs"]) {
    const templatePath = `${PROJECTS_ROOT}/scanner/.env.template`;
    const file = Bun.file(templatePath);
    let content = (await file.exists()) ? await file.text() : "";
    const recommendation = [
      "# Recommended Bun runtime settings (for performance & consistency)",
      "# Centralize transpiler cache — git-ignored, speeds up repeated scans/builds",
      "# BUN_RUNTIME_TRANSPILER_CACHE_PATH=${BUN_PLATFORM_HOME}/.bun-cache",
      "",
      "# Disable telemetry & crash reports (privacy best practice)",
      "# DO_NOT_TRACK=1",
    ].join("\n");

    if (!content.includes("BUN_RUNTIME_TRANSPILER_CACHE_PATH")) {
      content += "\n\n" + recommendation + "\n";
      await Bun.write(templatePath, content);
      console.log(c.green("  Updated .env.template with runtime recommendations"));
    } else {
      console.log(c.dim("  .env.template already contains runtime recommendations — no changes"));
    }
    return;
  }

  // ── Fix registry mode ─────────────────────────────────────────
  if (flags["fix-registry"]) {
    await fixRegistry(projects, flags["fix-registry"], !!flags["dry-run"]);
    return;
  }

  // ── Fix scopes mode ────────────────────────────────────────────
  // Usage: --fix-scopes https://url @scope1 @scope2
  if (flags["fix-scopes"]) {
    const scopeNames = positionals.filter((a) => a.startsWith("@"));
    if (scopeNames.length === 0) {
      console.log(c.red("\n  Usage: --fix-scopes <registry-url> @scope1 @scope2 ...\n"));
      return;
    }
    await fixScopes(projects, flags["fix-scopes"], scopeNames, !!flags["dry-run"]);
    return;
  }

  // ── Fix npmrc mode ──────────────────────────────────────────────
  // Usage: --fix-npmrc https://url @scope1 @scope2
  if (flags["fix-npmrc"]) {
    const scopeNames = positionals.filter((a) => a.startsWith("@"));
    if (scopeNames.length === 0) {
      console.log(c.red("\n  Usage: --fix-npmrc <registry-url> @scope1 @scope2 ...\n"));
      return;
    }
    await fixNpmrc(projects, flags["fix-npmrc"], scopeNames, !!flags["dry-run"]);
    return;
  }

  // ── Why mode ───────────────────────────────────────────────────
  if (flags.why) {
    await whyAcrossProjects(projects, flags.why, { top: !!flags.top, depth: flags.depth });
    return;
  }

  // ── Outdated mode ─────────────────────────────────────────────
  if (flags.outdated) {
    await outdatedAcrossProjects(projects, {
      filter: positionals.length > 0 ? positionals : undefined,
      production: !!flags.production,
      omit: flags.omit,
      global: !!flags.global,
      catalog: !!flags.catalog,
      wf: flags.wf,
    });
    return;
  }

  // ── Update mode ──────────────────────────────────────────────
  if (flags.update) {
    await updateAcrossProjects(projects, {
      dryRun: !!flags["dry-run"],
      patch: !!flags.patch,
      minor: !!flags.minor,
    });
    return;
  }

  // ── Verify mode ─────────────────────────────────────────────
  if (flags.verify) {
    await verifyLockfiles(projects);
    return;
  }

  // ── Info mode (--info or --pm-view) ─────────────────────────────
  const infoTarget = flags.info ?? flags["pm-view"];
  if (infoTarget) {
    await infoPackage(infoTarget, projects, !!flags.json, positionals[0]);
    return;
  }

  // ── Inspect mode ─────────────────────────────────────────────────
  if (flags.inspect) {
    const target = projects.find(
      (p) => p.folder === flags.inspect || p.name === flags.inspect
    );
    if (!target) {
      console.error(c.red(`Project "${flags.inspect}" not found.`));
      process.exit(1);
    }
    inspectProject(target);
    return;
  }

  // ── JSON output ──────────────────────────────────────────────────
  if (flags.json) {
    console.log(JSON.stringify(projects, null, 2));
    return;
  }

  // ── Table output ─────────────────────────────────────────────────
  if (projects.length === 0) {
    console.log(c.yellow("No projects matched the given filters."));
    return;
  }

  const elapsed = ((Bun.nanoseconds() - t0) / 1e6).toFixed(1);
  console.log();
  console.log(c.bold(c.cyan(`  Project Scanner — ${projects.length} projects scanned in ${elapsed}ms (bun ${Bun.version} ${Bun.revision.slice(0, 9)})`)));
  console.log();

  renderTable(projects, !!flags.detail);

  // ── Inline xref delta (default mode) ────────────────────────────
  const prevSnapshot = await loadXrefSnapshot(flags["audit-compare"] ?? undefined);
  if (prevSnapshot) {
    const currentXref = await scanXrefData(projects);
    const prevMap = new Map<string, XrefEntry>();
    for (const p of prevSnapshot.projects) prevMap.set(p.folder, p);
    const currentFolders = new Set(currentXref.map((x) => x.folder));
    const prevFolders = new Set(prevSnapshot.projects.map((p) => p.folder));
    const newCount = currentXref.filter((x) => !prevFolders.has(x.folder)).length;
    const removedCount = prevSnapshot.projects.filter((p) => !currentFolders.has(p.folder)).length;
    let changedCount = 0;
    for (const x of currentXref) {
      const prev = prevMap.get(x.folder);
      if (!prev) continue;
      if (x.bunDefault.length !== prev.bunDefault.length || x.explicit.length !== prev.explicit.length || x.blocked.length !== prev.blocked.length) changedCount++;
    }
    const hasDrift = newCount > 0 || removedCount > 0 || changedCount > 0;
    if (hasDrift) {
      const parts: string[] = [];
      if (newCount > 0) parts.push(c.cyan(`+${newCount} new`));
      if (removedCount > 0) parts.push(c.red(`-${removedCount} removed`));
      if (changedCount > 0) parts.push(c.yellow(`${changedCount} changed`));
      console.log();
      console.log(`  ${c.dim("xref Δ")} ${parts.join(c.dim(", "))}  ${c.dim(`(vs ${prevSnapshot.timestamp.slice(0, 10)}, run --compare for details)`)}`);
    } else {
      console.log();
      console.log(`  ${c.dim(`xref Δ  no drift (vs ${prevSnapshot.timestamp.slice(0, 10)})`)}`);
    }
    if (!flags["no-auto-snapshot"]) {
      await saveXrefSnapshot(currentXref, projects.filter((p) => p.hasPkg).length);
    }
  }
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(c.red("Fatal:"), err);
    process.exit(1);
  });
}
