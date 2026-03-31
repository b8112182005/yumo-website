import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#0D0D0D",
          char: "#1E1E1C",
          steel: "#2A2A28",
          raw: "#3D3B37",
          sand: "#C8C1B4",
          bone: "#E8E3DA",
          paper: "#EDE8E0",
          cream: "#F7F4EF",
          white: "#FAFAF7",
          gold: "#C6A45C",
          goldDark: "#9A7B3A",
          seal: "#B83A2E",
          muted: "#8A847A",
          faint: "#B5AFA3",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', "Georgia", "serif"],
        sans: ['"Noto Sans TC"', "sans-serif"],
        georgia: ["Georgia", "serif"],
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
};
export default config;
