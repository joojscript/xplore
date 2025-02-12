// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import cesium from "vite-plugin-cesium";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [cesium(), tailwindcss()],
  },
});