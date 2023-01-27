import { extendTheme } from '@chakra-ui/react';

import { Button } from './components/button';
import { Heading } from './components/heading';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import fonts from './foundations/fonts';
import styles from './styles';

const theme = (fontFamily: string) =>
  extendTheme({
    breakpoints,
    colors,
    components: {
      Button,
      Heading,
    },
    fonts: fonts(fontFamily),
    styles,
  });

export default theme;
