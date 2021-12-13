import { HelmetProvider } from 'react-helmet-async';

export const withHelmet = <T,>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithHelmet = (props: T) => (
    <HelmetProvider>
      <WrappedComponent {...(props as T)} />
    </HelmetProvider>
  );

  ComponentWithHelmet.displayName = `withHelmet(${displayName})`;

  return ComponentWithHelmet;
};
