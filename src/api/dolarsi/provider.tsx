import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { DolarsiClient, IDolarsiClient } from './dolarsi-client';

export const DolarsiClientContext = createContext<IDolarsiClient>({} as IDolarsiClient);

export const DolarsiClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dolarsiClient = useMemo(() => new DolarsiClient(window.fetch.bind(window)), []);

  return (
    <DolarsiClientContext.Provider value={dolarsiClient}>{children}</DolarsiClientContext.Provider>
  );
};

export const useDolarsiClient = (): IDolarsiClient => {
  const context = useContext(DolarsiClientContext);
  if (context === undefined) {
    throw new Error(`useDolarsiClient must be used within a DolarsiProvider.`);
  }
  return context;
};
