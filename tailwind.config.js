const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'media',
  theme: {
    colors: {
      gray:colors.gray,
      white:colors.white,
      blue: colors.red,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
