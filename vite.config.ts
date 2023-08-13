import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import viteESLint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function resolve(dir: string) {
  return path.join(__dirname, dir);
}
// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/1930 .env
export default defineConfig({
  plugins: [
    vue(),
    viteESLint(),
    Components({
      resolvers: [VantResolver()],
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("./src"),
      "@common": resolve("./src/common"),
      "@components": resolve("./src/components"),
      "@types": resolve("./src/types"),
      "@store": resolve("./src/store"),
      "@views": resolve("./src/views"),
    },
  },
});
