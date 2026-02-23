/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Ensure gradient and color classes are always generated
    'from-cyan-500',
    'to-blue-500',
    'to-blue-600',
    'from-yellow-300',
    'via-emerald-500',
    'text-blue-400',
    'text-cyan-400',
    'border-cyan-500',
    'border-blue-500',
    'bg-cyan-500',
    'bg-blue-500',
    'hover:text-blue-400',
    'hover:text-cyan-400',
  ],
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
        // Explicit cyan colors for consistency
        cyan: {
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
        },
        // Explicit blue colors for consistency
        blue: {
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
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
