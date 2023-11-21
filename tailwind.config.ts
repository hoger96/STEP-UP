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
      fontFamily: {
        pre: ["Pretendard", "Malgun Gothic"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#3C6C3B",
              50: "#C8D53E",
              100: "#A3C844",
              200: "#84BE4A",
              300: "#609E43",
            },
            default: {
              DEFAULT: "#121212",
              50: "#FAFBFD",
              100: "#e3e3e3",
              200: "#bebebe",
              300: "#555555",
              400: "#333333",
            },
            secondary: {
              DEFAULT: "#f0a755",
              50: "#faf6e2",
            },
          },
        },
      },
    }),
    plugin(function ({ addVariant, e, addComponents }) {
      // TODO: pub 아래 코드 확인 필요
      addVariant("cm-checkbox", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `cm-checkbox${separator}${className}`
          )} > span[aria-hidden]`;
        });
      }),
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
