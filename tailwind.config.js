/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // Blue-600
          dark: "#1D4ED8",    // Blue-700
          light: "#3B82F6",   // Blue-500
        },
        secondary: {
          DEFAULT: "#0EA5E9", // Sky-500
          dark: "#0284C7",    // Sky-600
          light: "#38BDF8",   // Sky-400
        },
        background: {
          light: "#F8FAFC",
          dark: "#0F172A",
        },
        customText: {
          base: "#E2E8F0",
          muted: "#94A3B8",
          heading: "#FFFFFF"
        },
        border: {
          DEFAULT: "#334155",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};