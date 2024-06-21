import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin';


export default [
  {
    plugins: {
      '@stylistic/js': stylisticJs
    }
  },
  {
    rules: {
      "semi-style": ["error", "last"],
      "semi-spacing": ["error", {"before": false, "after": true}],
      "@stylistic/js/semi": "error"
    }
  },
  {
    ignores: ["playwright.config.js"]
  },
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];