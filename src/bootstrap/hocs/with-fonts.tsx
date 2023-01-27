import { ChakraProvider } from '@chakra-ui/react';
import { Montserrat } from '@next/font/google';

import { NextFontsProvider } from '@/lib';
import theme from '@/theme';

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  subsets: ['latin'],
  // default, can also use "swap" to ensure custom font always shows
  display: 'optional',
});

export const withFonts = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithFonts = (props: T) => (
    <NextFontsProvider font={montserrat}>
      <WrappedComponent {...(props as T)} />
    </NextFontsProvider>
  );

  ComponentWithFonts.displayName = `withFonts(${displayName})`;

  return ComponentWithFonts;
};
