import { useUser } from '@entities';
import { PageLoader } from '@shared';

export const withAuthCheck = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithAuthCheck = (props: T) => {
    const { initializing } = useUser();
    if (initializing) {
      return <PageLoader />;
    }

    // props comes afterwards so the can override the default ones.
    return <>{<WrappedComponent {...(props as T)} />}</>;
  };

  ComponentWithAuthCheck.displayName = `withAuthCheck(${displayName})`;

  return ComponentWithAuthCheck;
};
