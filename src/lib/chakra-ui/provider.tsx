'use client';

import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';

export const ChakraUiProvider: React.FC<ChakraProviderProps> = ({ children, theme }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
