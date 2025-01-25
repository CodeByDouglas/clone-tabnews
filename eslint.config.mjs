import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    ignores: [
      ".next/", // Ignora arquivos gerados automaticamente pelo Next.js
      "node_modules/", // Ignora dependências
      "dist/", // Ignora arquivos de build
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": ["warn"],
      "no-undef": ["error"],
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
