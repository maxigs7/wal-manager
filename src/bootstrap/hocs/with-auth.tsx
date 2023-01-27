import { AuthProvider } from '@/m/auth';

export const withAuth = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
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
