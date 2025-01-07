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
    port: 8081,
    proxy: {
      "/api": {
        target: "https://ssafeople.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  html: {
    lang: "ko",
  },
  define: {
    global: "window", // 브라우저 환경에서 global을 window로 매핑
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
  preview: {
    port: 8081,
    host: true, // 모든 네트워크 인터페이스에서 접근 가능하도록 설정
  },
});
