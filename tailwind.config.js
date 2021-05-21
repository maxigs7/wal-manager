const colors = require('tailwindcss/colors');
const theme = require('tailwindcss/defaultTheme');
const customColors = {
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
  indigo: colors.indigo,
};

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...customColors,
    },
    fontSize: {
      ...theme.fontSize,
    },
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', ...theme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
