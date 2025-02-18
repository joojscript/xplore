import { defineConfig } from "astro/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts", "./test/ESBuildEncoder.ts"],

    css: true,
    reporters: ["verbose"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.test.{js,jsx,ts,tsx,astro}"],
      exclude: [],
    },
  },
});
