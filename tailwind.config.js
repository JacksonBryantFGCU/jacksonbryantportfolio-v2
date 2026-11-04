/** @type {import('tailwindcss').Config} */
// Design tokens. Every color, font, radius and easing on the site comes from here.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1020", // page background: deep night navy
        surface: "#101830", // raised surfaces (dialog, nav)
        line: "#1F2B47", // hairlines and borders
        text: "#E8EDF5", // primary text
        muted: "#8C98AF", // secondary text
        accent: {
          DEFAULT: "#2F6FED", // the one accent: buttons and active states
          hover: "#4A82F2",
          soft: "#8FB4FF", // links and highlights on dark
        },
        live: "#34D399", // only means "this site is live"
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Variable"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        display: ['"Bricolage Grotesque Variable"', '"IBM Plex Sans Variable"', "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.25rem, 9vw, 6.75rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        media: "14px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        page: "72rem",
      },
    },
  },
  plugins: [],
};
