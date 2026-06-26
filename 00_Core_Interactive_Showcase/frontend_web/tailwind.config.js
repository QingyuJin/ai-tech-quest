/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#15171a",
        paper: "#f6f8fb",
        line: "#d8dee8",
        signal: {
          cyan: "#0e7490",
          green: "#0f766e",
          amber: "#b7791f",
          rose: "#be123c",
          violet: "#6d28d9",
        },
      },
      boxShadow: {
        panel: "0 18px 48px rgba(15, 23, 42, 0.12)",
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
