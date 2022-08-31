import { SupabaseApiProvider } from '@api';

export const withSupabaseApi = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithSupabaseApi = (props: T) => (
    <SupabaseApiProvider>
      <WrappedComponent {...(props as T)} />
    </SupabaseApiProvider>
  );

  ComponentWithSupabaseApi.displayName = `withSupabaseApi(${displayName})`;

  return ComponentWithSupabaseApi;
};
