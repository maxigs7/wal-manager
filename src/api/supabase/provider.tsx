import { useSupabase } from '@lib';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { ISupabaseClient, SupabaseClient } from './supabase-client';

export const SupabaseApiContext = createContext<ISupabaseClient>({} as ISupabaseClient);

export const SupabaseApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const supabase = useSupabase();
  const client = useMemo(() => new SupabaseClient(supabase), [supabase]);

  return <SupabaseApiContext.Provider value={client}>{children}</SupabaseApiContext.Provider>;
};

export const useSupabaseApi = (): ISupabaseClient => {
  const context = useContext(SupabaseApiContext);
  if (context === undefined) {
    throw new Error(`useSupabaseApi must be used within a SupabaseApiProvider.`);
  }
  return context;
};
