import { TransactionStoreProvider } from '@entities';

export const withTransactionStore = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithApi = (props: T) => (
    <TransactionStoreProvider>
      <WrappedComponent {...(props as T)} />
    </TransactionStoreProvider>
  );

  ComponentWithApi.displayName = `withTransactionStore(${displayName})`;

  return ComponentWithApi;
};
