const colors = require('tailwindcss/colors');
const theme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: process.env.NODE_ENV === 'development' ? 'jit' : '',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      primary: colors.red,
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
