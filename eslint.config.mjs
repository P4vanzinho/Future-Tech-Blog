import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import react from "eslint-plugin-react";
import tailwindcss from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      tailwindcss,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-explicit-any": "error",

      "no-console": ["warn", { allow: ["warn", "error", "info"] }],

      "no-undef": "error",

      "prefer-template": "warn",

      eqeqeq: ["error", "always"],

      "no-unreachable": "error",

      "no-constant-condition": "error",

      "no-restricted-syntax": [
        "warn",
        {
          selector: "CallExpression[callee.name='useEffect']",
          message:
            "useEffect detected. Consider alternatives like Server Components, Server Actions or React Compiler.",
        },
      ],
    },
  },
];

export default eslintConfig;
