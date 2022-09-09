import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { FetchClient, IFetchClient } from './fetch-client';

export const FetchApiContext = createContext<IFetchClient>({} as IFetchClient);

export const FetchApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const client = useMemo(() => new FetchClient(fetch, '/api'), []);

  return <FetchApiContext.Provider value={client}>{children}</FetchApiContext.Provider>;
};

export const useFetchClient = (): IFetchClient => {
  const context = useContext(FetchApiContext);
  if (context === undefined) {
    throw new Error(`useFetchClient must be used within a FetchApiProvider.`);
  }
  return context;
};
