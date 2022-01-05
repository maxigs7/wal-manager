import { extendTheme } from '@chakra-ui/react';

import { Heading } from './components/heading';
import colors from './foundations/colors';
import fonts from './foundations/fonts';
import styles from './styles';

const theme = extendTheme({
  colors,
  components: {
    Heading,
  },
  fonts,
  styles,
});

export default theme;
