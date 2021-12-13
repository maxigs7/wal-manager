import { ApiProvider } from '@entities';

export const withApi = <T,>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithApi = (props: T) => (
    <ApiProvider>
      <WrappedComponent {...(props as T)} />
    </ApiProvider>
  );

  ComponentWithApi.displayName = `withApi(${displayName})`;

  return ComponentWithApi;
};
