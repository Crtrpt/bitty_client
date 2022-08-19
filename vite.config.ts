import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/": {
        target: "http://127.0.0.1:9081",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
});
