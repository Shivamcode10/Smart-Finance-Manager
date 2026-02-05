/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // REQUIRED for dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          light: "#f8fafc",
          dark: "#020617",
          surfaceLight: "#ffffff",
          surfaceDark: "#0f172a",
          borderDark: "#1e293b",
          mutedDark: "#94a3b8",
          accent: "#4f46e5",
        },
      },
    },
  },
  plugins: [],
};
