import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import svgLoader from "vite-svg-loader";
import viteESLint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

import path from "path";

function resolve(dir: string) {
    return path.join(__dirname, dir);
}

// https://vitejs.dev/config/
// https://github.com/vitejs/vite/issues/1930 .env
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
        viteESLint(),
        Components({
            resolvers: [],
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
            "@api": resolve("./src/api"),
            "@common": resolve("./src/common"),
            "@components": resolve("./src/components"),
            "@types": resolve("./src/types"),
            "@store": resolve("./src/store"),
            "@views": resolve("./src/views"),
        },
    },
});
