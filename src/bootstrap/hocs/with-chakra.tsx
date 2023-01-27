import { ChakraProvider } from '@chakra-ui/react';
import { Montserrat } from '@next/font/google';

import { useNextFont } from '@/lib';
import theme from '@/theme';

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  subsets: ['latin'],
  // default, can also use "swap" to ensure custom font always shows
  display: 'optional',
});

export const withChakra = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithChakra = (props: T) => {
    const font = useNextFont();
    return (
      <ChakraProvider theme={theme(font.style.fontFamily)}>
        <WrappedComponent {...(props as T)} />
      </ChakraProvider>
    );
  };

  ComponentWithChakra.displayName = `withChakra(${displayName})`;

  return ComponentWithChakra;
};
