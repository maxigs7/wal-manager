import { ChakraProvider } from '@chakra-ui/react';

import { startChakra } from '@shared';

const theme = startChakra();

export const withChakra = <T,>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithChakra = (props: T) => (
    <ChakraProvider theme={theme}>
      <WrappedComponent {...(props as T)} />
    </ChakraProvider>
  );

  ComponentWithChakra.displayName = `withChakra(${displayName})`;

  return ComponentWithChakra;
};
