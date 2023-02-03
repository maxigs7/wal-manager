'use client';

import { extendTheme } from '@chakra-ui/react';

import { ThemeBuild } from '@/lib/chakra-ui';

import { Button } from './components/button';
import { Heading } from './components/heading';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import fonts from './foundations/fonts';
import styles from './styles';

const theme: ThemeBuild = ({ bodyFontFamily }) =>
  extendTheme({
    breakpoints,
    colors,
    components: {
      Button,
      Heading,
    },
    fonts: fonts(bodyFontFamily),
    styles,
  });

export default theme;
