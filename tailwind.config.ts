import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0c0c",
        border: "#2a2a2a",
        muted: "#e8e3db",
        transcript: "#d4cfc8",
        accent: "#9b4444",
        annotation: "#a09a94",
        claude: "#7a9b8a",
        "btn-border": "#3a3a3a",
        "btn-text": "#6a6a6a",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
