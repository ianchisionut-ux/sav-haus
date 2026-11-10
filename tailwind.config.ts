import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#081923",
        "navy-soft": "#081923",
        orange: "#F9982D",
        "orange-dark": "#E98519",
        graybg: "#F5F2EB",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "Arial", "sans-serif"],
        serif: ["var(--font-manrope)", "Manrope", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
