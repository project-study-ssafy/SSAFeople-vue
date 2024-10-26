import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 브라우저 환경 전역 변수
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        process: "readonly", // Node.js의 process 전역 변수를 추가
      },
    },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
