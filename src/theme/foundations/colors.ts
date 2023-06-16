import { theme } from '@chakra-ui/react';

const { colors: defaultColors } = theme;

const themes = {
  blue: { primary: defaultColors.blue, accent: defaultColors.cyan },
  green: { primary: defaultColors.green, accent: defaultColors.teal },
  purple: { primary: defaultColors.purple, accent: defaultColors.pink },
  red: { primary: defaultColors.red, accent: defaultColors.yellow },
};

const colors = {
  primary: {
    ...themes.green.primary,
  },
  accent: {
    ...themes.green.accent,
  },
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
};

export default colors;
