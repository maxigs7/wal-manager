'use client';

import { extendTheme } from '@chakra-ui/react';

import { Button } from './components/button';
import { Heading } from './components/heading';
import { Input } from './components/input';
import config from './config';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import fonts from './foundations/fonts';
import styles from './styles';

const theme = extendTheme({
  breakpoints,
  colors,
  components: {
    Button,
    Input,
    Heading,
  },
  config,
  fonts,
  styles,
});

export default theme;
