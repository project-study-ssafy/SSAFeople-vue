/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "4way": "0 0 10px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
