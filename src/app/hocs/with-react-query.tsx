import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const withReactQuery = <T,>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithReactQuery = (props: T) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...(props as T)} />
    </QueryClientProvider>
  );

  ComponentWithReactQuery.displayName = `withReactQuery(${displayName})`;

  return ComponentWithReactQuery;
};
