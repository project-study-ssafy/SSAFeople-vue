/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "4way": "0 0 10px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [typography],
};
