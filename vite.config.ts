import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  // base: "/modish/", 
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
  ],
  build: {
    assetsDir: "static",
    outDir: process.env.VITE_OUTPUT_DIR ? process.env.VITE_OUTPUT_DIR : "dist",
  },
  server: {
    port: (process.env.VITE_SERVER_PORT || 3000) as number,
    proxy: {
      "/api": process.env.VITE_DEV_API || "http://127.0.0.1:8000",
      "/media": process.env.VITE_DEV_API || "http://127.0.0.1:8000",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
