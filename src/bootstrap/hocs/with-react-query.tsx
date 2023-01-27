import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const withReactQuery = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithReactQuery = (props: T) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...(props as T)} />
    </QueryClientProvider>
  );

  ComponentWithReactQuery.displayName = `withReactQuery(${displayName})`;

  return ComponentWithReactQuery;
};
