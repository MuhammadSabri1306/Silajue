/** @type {import("tailwindcss").Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
// const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    fontFamily: {
      "sans": ["Poppins", ...defaultTheme.fontFamily.sans],
      "body": ["Poppins", ...defaultTheme.fontFamily.sans]
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '8rem',
        xl: '8rem',
        '2xl': '8rem'
      },
    },
    extend: {
      colors: {
        primary: {
          '100': '#addbf0',
          '200': '#99d3ed',
          '300': '#85cbea',
          '400': '#71c3e7',
          '500': '#5cb8e4',
          '600': '#50a4cc',
          '700': '#4490b4',
          '800': '#387c9c',
          '900': '#2b6783'
        },
        danger: {
          '100': '#ffa9a9',
          '200': '#f99696',
          '300': '#f38383',
          '400': '#ed7070',
          '500': '#e45c5c',
          '600': '#d75454',
          '700': '#ca4c4c',
          '800': '#bd4444',
          '900': '#ad3939'
        },
        graylight: "#D9D9D9",
        light: {
          "100": "#f2f2f2",
          "200": "#e6e6e6",
          "300": "#dadada",
          "400": "#cecece",
          "500": "#c2c2c2",
          "600": "#b6b6b6",
          "700": "#aaaaaa",
          "800": "#9e9e9e",
          "900": "#929292"
        },
        dark: {
          "100": "#868686",
          "200": "#7a7a7a",
          "300": "#6e6e6e",
          "400": "#626262",
          "500": "#565656",
          "600": "#4a4a4a",
          "700": "#3e3e3e",
          "800": "#323232",
          "900": "#1c1917"
        }
      }
    },
  },
  plugins: [],
}