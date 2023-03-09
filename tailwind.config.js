const breakpoints = require('./theme/breakpoints');
const colors = require('./theme/colors');
const shadows = require('./theme/shadows');
const typography = require('./theme/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    boxShadow: shadows,
    colors,
    fontFamily: typography,
    screens: breakpoints,
  },
  plugins: [require('@tailwindcss/forms')],
};
