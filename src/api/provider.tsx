import { createContext, useContext, useMemo } from 'react';

import { useSupabase } from '@lib';

import createApi, { IApi } from './api';

export const ApiContext = createContext<IApi>({} as IApi);

export const ApiProvider: React.FC = ({ children }) => {
  const supabase = useSupabase();
  const api = useMemo(() => createApi(supabase), [supabase]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = (): IApi => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error(`useApi must be used within a ApiProvider.`);
  }
  return context;
};
