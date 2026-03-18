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

export default tseslint.config(
  { ignores },
  {
    files: jsAndTsFiles,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
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
