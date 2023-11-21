import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        "\\.svg$": "<rootDir>/__mocks__/svg.js",
      },
    },
    test: {
      include: ["src/**/*.test.(ts|tsx)"],
      globals: true,
      environment: "jsdom",
      exclude: ["*.svg?component"],
    },
  })
);
