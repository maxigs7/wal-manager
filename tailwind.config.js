import { nextui } from '@nextui-org/theme';

import blue from './tailwind/blue';
import dark from './tailwind/dark';
import green from './tailwind/green';
import light from './tailwind/light';
import purple from './tailwind/purple';
import red from './tailwind/red';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      '2xl': '1320px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'wmui',
      themes: {
        dark,
        light,
        ...blue,
        ...green,
        ...purple,
        ...red,
      },
    }),
  ],
};
