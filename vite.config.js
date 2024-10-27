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
  define: {
    "process.env.MAIN_API_SERVER_URL": JSON.stringify(
      `${process.env.MAIN_API_SERVER_URL}`,
    ),
    "process.env.SEND_EMAIL_VERIFICATION_CODE": JSON.stringify(
      `${process.env.SEND_EMAIL_VERIFICATION_CODE}`,
    ),
    "process.env.EMAIL_VERIFY": JSON.stringify(`${process.env.EMAIL_VERIFY}`),
    "process.env.REGISTER": JSON.stringify(`${process.env.REGISTER}`),
    "process.env.SIGNIN": JSON.stringify(`${process.env.SIGNIN}`),
  },
  // server: {
  //     proxy: {
  //         '/': 'http://localhost:8080'
  //     }
  // }
});
