/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15171a",
        panel: "#ffffff",
        line: "#d8dee8",
        lab: {
          green: "#0f766e",
          cyan: "#0e7490",
          amber: "#b7791f",
          rose: "#be123c",
          violet: "#6d28d9",
        },
      },
      boxShadow: {
        lab: "0 18px 50px rgba(17, 24, 39, 0.12)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans TC",
          "Microsoft JhengHei",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
