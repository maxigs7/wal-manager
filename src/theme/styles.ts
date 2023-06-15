import { Theme } from '@chakra-ui/react';

type GlobalProps = {
  colorMode: string;
  theme: Theme;
};

const styles = {
  global: ({ colorMode }: GlobalProps): any => {
    return {
      body: {
        bg: colorMode === 'dark' ? 'primary.900' : 'gray.100',
        color: colorMode === 'dark' ? 'primary.100' : 'gray.700',
      },
    };
  },
};

export default styles;
