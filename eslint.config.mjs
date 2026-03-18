import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

const ignores = [
  "dist/**",
  ".astro/**",
  "node_modules/**",
  ".sanity/**",
  "tmp/**",
];

const jsAndTsFiles = ["**/*.{js,mjs,cjs,ts,mts,cts}"];
const reactFiles = ["**/*.{jsx,tsx}"];
const nodeFiles = [
  "astro.config.mjs",
  "eslint.config.mjs",
  ".prettierrc.mjs",
  "sanity.cli.ts",
  "sentry.server.config.js",
];
const browserFiles = ["sentry.client.config.js"];
const processEnvFiles = ["sanity.config.ts", "src/sanity/client.ts"];

export default tseslint.config(
  { ignores },
  {
    files: jsAndTsFiles,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: nodeFiles,
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: browserFiles,
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: processEnvFiles,
    languageOptions: {
      globals: {
        process: "readonly",
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs["flat/recommended"],
  {
    ...reactPlugin.configs.flat.recommended,
    files: reactFiles,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ...reactHooks.configs.flat["recommended-latest"],
    files: reactFiles,
  },
);
