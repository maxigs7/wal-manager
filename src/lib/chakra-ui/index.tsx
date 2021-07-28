import { extendTheme } from '@chakra-ui/react';

export const startChakra = (): any =>
  extendTheme({
    fonts: {
      heading: 'Montserrat',
      body: 'Montserrat',
    },
  });

export * from './icon';
