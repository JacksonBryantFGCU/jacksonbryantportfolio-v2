/** @type {import('tailwindcss').Config} */
// Design tokens. Every color, font, radius and easing on the site comes from here.
// Theme: a LiDAR point cloud at night. Deep navy, one blue accent, and a cyan "scan" used sparingly.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#060A14", // page background
        surface: "#0D1426", // raised surfaces (cards, dialog, nav)
        line: "#1A2440", // hairlines and borders
        text: "#E8EDF5", // primary text
        muted: "#8A96AD", // secondary text
        accent: {
          DEFAULT: "#2F6FED", // buttons and active states
          hover: "#4A82F2",
          soft: "#8FB4FF", // links and highlights on dark
        },
        scan: "#6EE7F9", // the scan line: tiny details only, never body text
        live: "#34D399", // only means "this site is live"
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Variable"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        display: ['"Bricolage Grotesque Variable"', '"IBM Plex Sans Variable"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 11vw, 9.5rem)", { lineHeight: "0.88", letterSpacing: "-0.045em" }],
        mega: ["clamp(3rem, 10vw, 8.5rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        media: "14px",
        card: "24px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        page: "76rem",
      },
    },
  },
  plugins: [],
};
