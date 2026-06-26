/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        muted: "#667085",
        line: "#D9E2EC",
        lab: "#F6F9FC",
        cyan: "#0EA5E9",
        teal: "#0F766E",
        violet: "#6D5DF6",
        amber: "#D97706",
        green: "#047857",
      },
      boxShadow: {
        panel: "0 18px 55px rgba(16, 24, 40, 0.08)",
        glow: "0 0 0 1px rgba(14, 165, 233, 0.14), 0 20px 70px rgba(14, 165, 233, 0.16)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
