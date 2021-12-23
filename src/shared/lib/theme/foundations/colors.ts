import { theme } from '@chakra-ui/react';

const { colors: defaultColors } = theme;

// https://javisperez.github.io/tailwindcolorshades/?citron=aaac39&well-read=bf4040&fun-green=267336&cello=1d3557&wedgewood=457b9d&powder-blue=a8dadc&crimson=e63946&narvik=f1faee&info=2253c3
const pallete = {
  crimson: {
    50: '#fef5f6',
    100: '#fdebed',
    200: '#f9ced1',
    300: '#f5b0b5',
    400: '#ee747e',
    500: '#e63946', // PRINCIPAL
    600: '#cf333f',
    700: '#ad2b35',
    800: '#8a222a',
    900: '#711c22',
  },
  narvik: {
    50: '#FEFFFE',
    100: '#FEFFFD',
    200: '#FCFEFB',
    300: '#F9FDF8',
    400: '#F5FCF3',
    500: '#F1FAEE', // PRINCIPAL
    600: '#D9E1D6',
    700: '#B5BCB3',
    800: '#91968F',
    900: '#767B75',
  },
  powderBlue: {
    50: '#FBFDFD',
    100: '#F6FBFC',
    200: '#E9F6F6',
    300: '#DCF0F1',
    400: '#C2E5E7',
    500: '#A8DADC', // PRINCIPAL
    600: '#97C4C6',
    700: '#7EA4A5',
    800: '#658384',
    900: '#526B6C',
  },
  wedgewood: {
    50: '#F6F8FA',
    100: '#ECF2F5',
    200: '#D1DEE7',
    300: '#B5CAD8',
    400: '#7DA3BA',
    500: '#457B9D', // PRINCIPAL
    600: '#3E6F8D',
    700: '#345C76',
    800: '#294A5E',
    900: '#223C4D',
  },
  cello: {
    50: '#F4F5F7',
    100: '#E8EBEE',
    200: '#C7CDD5',
    300: '#A5AEBC',
    400: '#617289',
    500: '#1D3557',
    600: '#1A304E',
    700: '#162841',
    800: '#112034',
    900: '#0E1A2B',
  },
};

export default {
  ...pallete,

  success: {
    ...defaultColors.green,
  },
  danger: {
    ...defaultColors.red,
  },
  warning: {
    ...defaultColors.yellow,
  },
  info: {
    ...defaultColors.blue,
  },
  primary: {
    ...pallete.wedgewood,
  },
  secondary: {
    ...pallete.powderBlue,
  },
  accent: {
    ...pallete.crimson,
  },
};
