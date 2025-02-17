// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import cesium from "vite-plugin-cesium";

import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react()],
  adapter: node({
    mode: "standalone",
  }),
  devToolbar: {
    enabled: false,
  },
  env: {
    schema: {
      BACKEND_URL: {
        context: "client",
        type: "string",
        optional: false,
        access: "public",
      },
    },
  },
  vite: {
    // @ts-expect-error
    plugins: [cesium(), tailwindcss()],
  },
});
