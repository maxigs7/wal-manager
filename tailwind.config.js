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
      gray: colors.trueGray,
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
      borderWidth: ['hover'],
    },
  },
  plugins: [],
};
