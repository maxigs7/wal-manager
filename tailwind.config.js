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
      primary: colors.blue,
      transparent: 'transparent',
      gray: colors.trueGray,
    },
    fontSize: {
      ...theme.fontSize,
    },
    screens: {
      xs: '475px',
      ...theme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', ...theme.fontFamily.sans],
      },
      spacing: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderWidth: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
