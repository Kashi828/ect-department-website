/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#152449",
        "navy-deep": "#0C1830",
        "navy-soft": "#1F3564",
        gold: "#C9A227",
        "gold-bright": "#E8C766",
        ivory: "#F6F4EC",
        ink: "#16213B",
        muted: "#5B6478",
        line: "#DEDCD1",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: { site: "1200px" },
    },
  },
  plugins: [],
};
