import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [vue()],
    build: {
        target: "esnext"
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    css: {
        preprocessorOptions: {
            scss : {
                additionalData: `
                    @import "@/assets/scss/colors.scss";
                    @import "@/assets/scss/layout.scss";
                `
            }
        }
    }
});
