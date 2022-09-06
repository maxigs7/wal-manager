import { Theme } from '@chakra-ui/react';

type GlobalProps = {
  colorMode: string;
  theme: Theme;
};

const styles = {
  global: ({ colorMode }: GlobalProps): any => {
    return {
      body: {
        bg: colorMode === 'dark' ? 'primary.900' : 'primary.100',
        color: colorMode === 'dark' ? 'gray.300' : 'gray.600',
      },
    };
  },
};

export default styles;
