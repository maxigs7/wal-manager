import { extendTheme } from '@chakra-ui/react';

export const startChakra = (): any =>
  extendTheme({
    colors: {
      // https://javisperez.github.io/tailwindcolorshades/?citron=aaac39&well-read=bf4040&fun-green=267336&cello=1d3557&wedgewood=457b9d&powder-blue=a8dadc&crimson=e63946&narvik=f1faee&info=2253c3
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
        50: '#fefffe',
        100: '#fefffd',
        200: '#fcfefb',
        300: '#f9fdf8',
        400: '#f5fcf3',
        500: '#f1faee', // PRINCIPAL
        600: '#d9e1d6',
        700: '#b5bcb3',
        800: '#91968f',
        900: '#767b75',
      },
      powderBlue: {
        50: '#fbfdfd',
        100: '#f6fbfc',
        200: '#e9f6f6',
        300: '#dcf0f1',
        400: '#c2e5e7',
        500: '#a8dadc', // PRINCIPAL
        600: '#97c4c6',
        700: '#7ea4a5',
        800: '#658384',
        900: '#526b6c',
      },
      wedgewood: {
        50: '#f6f8fa',
        100: '#ecf2f5',
        200: '#d1dee7',
        300: '#b5cad8',
        400: '#7da3ba',
        500: '#457b9d', // PRINCIPAL
        600: '#3e6f8d',
        700: '#345c76',
        800: '#294a5e',
        900: '#223c4d',
      },
      cello: {
        50: '#f4f5f7',
        100: '#e8ebee',
        200: '#c7cdd5',
        300: '#a5aebc',
        400: '#617289',
        500: '#1d3557',
        600: '#1a304e',
        700: '#162841',
        800: '#112034',
        900: '#0e1a2b',
      },
      success: {
        50: '#f4f8f5',
        100: '#e9f1eb',
        200: '#c9dccd',
        300: '#a8c7af',
        400: '#679d72',
        500: '#267336',
        600: '#226831',
        700: '#1d5629',
        800: '#174520',
        900: '#13381a',
      },
      danger: {
        50: '#fcf5f5',
        100: '#f9ecec',
        200: '#efcfcf',
        300: '#e5b3b3',
        400: '#d27979',
        500: '#bf4040',
        600: '#ac3a3a',
        700: '#8f3030',
        800: '#732626',
        900: '#5e1f1f',
      },
      warning: {
        50: '#fbfbf5',
        100: '#f7f7eb',
        200: '#eaeace',
        300: '#dddeb0',
        400: '#c4c574',
        500: '#aaac39',
        600: '#999b33',
        700: '#80812b',
        800: '#666722',
        900: '#53541c',
      },
      info: {
        50: '#f4f6fc',
        100: '#e9eef9',
        200: '#c8d4f0',
        300: '#a7bae7',
        400: '#6487d5',
        500: '#2253c3',
        600: '#1f4bb0',
        700: '#1a3e92',
        800: '#143275',
        900: '#112960',
      },
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Montserrat',
    },
  });

export * from './color/types';
export * from './icon';
export * from './toast';
