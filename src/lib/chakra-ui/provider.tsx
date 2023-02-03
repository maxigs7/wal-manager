import { PropsWithChildren } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { useNextFont } from '../@next/font';

export type ThemeConfig = { bodyFontFamily: string; headingFontFamily?: string };
export type ThemeBuild = (config: ThemeConfig) => Record<string, any> | undefined;

type ChakraProviderProps = PropsWithChildren & { theme: ThemeBuild };

export const CharkraUiProvider: React.FC<ChakraProviderProps> = ({ children, theme }) => {
  const font = useNextFont();

  return (
    <ChakraProvider theme={theme({ bodyFontFamily: font.style.fontFamily })}>
      {children}
    </ChakraProvider>
  );
};
