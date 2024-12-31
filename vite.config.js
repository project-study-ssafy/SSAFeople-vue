import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8080,
    // proxy: {
    //     '/': 'http://localhost:8080'
    // }
  },
  html: {
    lang: "ko",
  },
  define: {
    global: "window", // 브라우저 환경에서 global을 window로 매핑
  },
});
