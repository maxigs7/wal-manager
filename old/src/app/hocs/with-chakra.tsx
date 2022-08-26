import { ChakraProvider } from '@chakra-ui/react';

import theme from '@theme';

export const withChakra = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
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
