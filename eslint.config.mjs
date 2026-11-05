import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "renders/**",
      "out/**",
      "dist/**",
      "build/**",
      ".cache/**",
    ],
  },

  {
    files: ["src/**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]);
