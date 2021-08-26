import React, { createContext, useContext } from 'react';

import { createApi, IFirestoreApi } from './methods';

export const FirestoreApiContext: React.Context<IFirestoreApi> = createContext<IFirestoreApi>(
  {} as IFirestoreApi,
);

export const FirestoreApiProvider: React.FC = ({ children }) => {
  const api = createApi();

  return <FirestoreApiContext.Provider value={api}>{children}</FirestoreApiContext.Provider>;
};

export const useFirestoreApi: () => IFirestoreApi = () => useContext(FirestoreApiContext);
