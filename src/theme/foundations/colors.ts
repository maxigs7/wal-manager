import { theme } from '@chakra-ui/react';

const { colors: defaultColors } = theme;

const colors = {
  primary: {
    ...defaultColors.purple,
  },
  accent: {
    ...defaultColors.pink,
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
