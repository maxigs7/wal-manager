import { PagePortalsProvider } from '../providers';

export default <T extends object>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithPagePortals = (props: T) => (
    <PagePortalsProvider>
      <WrappedComponent {...(props as T)} />
    </PagePortalsProvider>
  );

  ComponentWithPagePortals.displayName = `withPagePortals(${displayName})`;

  return ComponentWithPagePortals;
};
