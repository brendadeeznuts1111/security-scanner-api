import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".bun/**",
      "coverage/**",
      "**/*.test.ts",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // ────────────────────────────────────────────────────────────────
      // @typescript-eslint/naming-convention
      //
      // Enforces consistent naming across the codebase:
      //   - Exported SCREAMING_SNAKE_CASE constants → BUN_ prefix required
      //   - Exported PascalCase constants (Zod schemas) → PascalCase allowed
      //   - Exported classes/enums → PascalCase
      //   - Exported functions → camelCase
      //   - Non-exported constants → UPPER_CASE, camelCase, or PascalCase
      //
      // Why BUN_ prefix?
      //   All public SCREAMING_SNAKE constants represent Bun-specific
      //   documentation intelligence data (catalogs, provenance, keywords,
      //   annotations). The prefix prevents ambiguity and signals origin.
      //
      // Examples:
      //   ✓ export const BUN_API_CATALOG = [...]
      //   ✓ export const BUN_DOC_BASE = "https://bun.sh/docs"
      //   ✗ export const API_CATALOG = [...]     // missing BUN_ prefix
      //   ✗ export const doc_base = "..."         // wrong format
      //   ✓ export const ThreatFeedSchema = z.object({...})  // PascalCase OK
      //   ✓ const RESET = "\x1b[0m"              // non-exported, no prefix needed
      // ────────────────────────────────────────────────────────────────
      "@typescript-eslint/naming-convention": [
        "error",

        // ── Rule 1: Exported SCREAMING_SNAKE_CASE → must start with BUN_ ──
        // Applies only to names matching ^[A-Z][A-Z0-9_]+$ (filter).
        // The custom regex enforces the BUN_ prefix on top of UPPER_CASE format.
        {
          selector: "variable",
          modifiers: ["const", "exported"],
          format: ["UPPER_CASE"],
          leadingUnderscore: "forbid",
          trailingUnderscore: "forbid",
          filter: {
            regex: "^[A-Z][A-Z0-9_]+$",
            match: true,
          },
          custom: {
            regex: "^BUN_[A-Z0-9_]+$",
            match: true,
          },
        },

        // ── Rule 2: Exported non-SCREAMING_SNAKE constants → PascalCase or camelCase ──
        // Covers Zod schemas (ThreatFeedSchema), config objects, etc.
        {
          selector: "variable",
          modifiers: ["const", "exported"],
          format: ["PascalCase", "camelCase"],
          filter: {
            regex: "^[A-Z][A-Z0-9_]+$",
            match: false,
          },
        },

        // ── Rule 3: Non-exported constants → flexible (no BUN_ prefix needed) ──
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["UPPER_CASE", "camelCase", "PascalCase"],
          leadingUnderscore: "allow",
          filter: {
            regex: "^BUN_",
            match: false,
          },
        },

        // ── Rule 4: Exported classes and enums → PascalCase ──
        {
          selector: ["class", "enum"],
          modifiers: ["exported"],
          format: ["PascalCase"],
          leadingUnderscore: "forbid",
        },

        // ── Rule 5: Exported functions → camelCase ──
        {
          selector: "function",
          modifiers: ["exported"],
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
      ],
    },
  },
);
