import { AccountFilterProvider } from '../providers';

export default <T extends object>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithApi = (props: T) => (
    <AccountFilterProvider>
      <WrappedComponent {...(props as T)} />
    </AccountFilterProvider>
  );

  ComponentWithApi.displayName = `withAccountFilter(${displayName})`;

  return ComponentWithApi;
};
