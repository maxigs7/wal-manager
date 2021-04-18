const colors = require('tailwindcss/colors');
const theme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      blueGray: colors.blueGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      emerald: colors.emerald,
      teal: colors.teal,
      lightBlue: colors.lightBlue,
      purple: colors.purple,
      pink: colors.pink,
    },
    fontSize: {
      ...theme.fontSize,
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
