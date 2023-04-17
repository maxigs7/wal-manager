import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: 'regular', // Normally, it is "bold"
    textTransform: 'uppercase',
  },
};
