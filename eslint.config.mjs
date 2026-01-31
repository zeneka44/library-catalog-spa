import { defineConfig } from "eslint/config";
import nextPlugin from "eslint-config-next";

export default defineConfig([
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
    ],
  },
  ...nextPlugin,
]);
