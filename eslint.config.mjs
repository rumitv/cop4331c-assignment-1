import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "js/md5.js"],
  },
  {
    files: ["js/code.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern:
            "^(doLogin|readCookie|doLogout|addColor|searchColor)$",
        },
      ],
    },
  },
];
