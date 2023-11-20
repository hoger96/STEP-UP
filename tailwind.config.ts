import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: {
          1: "#3C6C3B",
          2: "#609E43",
          3: "#84BE4A",
          4: "#A3C844",
          5: "#C8D53E",
        },
      },
      textColor: {
        primary: {
          1: "#3C6C3B",
          2: "#609E43",
          3: "#84BE4A",
          4: "#A3C844",
          5: "#C8D53E",
        },
        black: {
          1: "#121212",
          2: "#333333",
          3: "#555555",
          4: "#bebebe",
          5: "#e3e3e3",
        },
      },
      borderColor: {
        black: {
          1: "#121212",
          2: "#333333",
          3: "#555555",
          4: "#bebebe",
          5: "#e3e3e3",
        },
      },
      fontFamily: {
        pre: ["Pretendard", "Malgun Gothic"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function ({ addComponents }) {
      addComponents({
        // Flex Pattern
        ".flex-column": {
          display: "flex",
          flexDirection: "column",
        },
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-center-column": {
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        },
        ".flex-center-ver": {
          display: "flex",
          alignItems: "center",
        },
        ".flex-center-hor": {
          display: "flex",
          justifyContent: "center",
        },
      });
    }),
  ],
};

export default config;
