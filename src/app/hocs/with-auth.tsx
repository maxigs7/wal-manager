import { AuthProvider } from '@entities';

export const withAuth = <T,>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithAuth = (props: T) => (
    <AuthProvider>
      <WrappedComponent {...(props as T)} />
    </AuthProvider>
  );

  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
};
