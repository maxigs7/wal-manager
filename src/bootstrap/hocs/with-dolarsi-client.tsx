import { DolarsiClientProvider } from '@/api';

export const withDolarsiClient = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithDolarsi = (props: T) => (
    <DolarsiClientProvider>
      <WrappedComponent {...(props as T)} />
    </DolarsiClientProvider>
  );

  ComponentWithDolarsi.displayName = `withDolarsiClient(${displayName})`;

  return ComponentWithDolarsi;
};
