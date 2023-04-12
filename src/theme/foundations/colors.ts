import { theme } from '@chakra-ui/react';

const { colors: defaultColors } = theme;

const colors = {
  primary: {
    ...defaultColors.blue,
  },
  accent: {
    ...defaultColors.cyan,
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
