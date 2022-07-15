import { createContext, useContext } from 'react';

import { PageLoader } from '@shared';

import { IDolarsi } from './types';
import useDolarsiFetch from './useDolarsiFetch';

export const DolarsiContext = createContext<IDolarsi[]>([]);

export const DolarsiProvider: React.FC = ({ children }) => {
  const { data, isLoading } = useDolarsiFetch();

  if (isLoading) {
    return <PageLoader />;
  }

  return <DolarsiContext.Provider value={data || []}>{children}</DolarsiContext.Provider>;
};

export const useDolarsi = (): IDolarsi[] => {
  const context = useContext(DolarsiContext);
  if (context === undefined) {
    throw new Error(`useDolarsi must be used within a DolarsiProvider.`);
  }
  return context;
};

export const withDolarsi = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithDolarsi = (props: T) => (
    <DolarsiProvider>
      <WrappedComponent {...(props as T)} />
    </DolarsiProvider>
  );

  ComponentWithDolarsi.displayName = `withDolarsi(${displayName})`;

  return ComponentWithDolarsi;
};
