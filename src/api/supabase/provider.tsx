import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { useSupabase } from '@lib';

import { ISupabaseClient, SupabaseClient } from './supabase-client';

export const SupabaseClientContext = createContext<ISupabaseClient>({} as ISupabaseClient);

export const SupabaseClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const supabase = useSupabase();
  const client = useMemo(() => new SupabaseClient(supabase), [supabase]);

  return <SupabaseClientContext.Provider value={client}>{children}</SupabaseClientContext.Provider>;
};

export const useSupabaseClient = (): ISupabaseClient => {
  const context = useContext(SupabaseClientContext);
  if (context === undefined) {
    throw new Error(`useSupabaseApi must be used within a SupabaseApiProvider.`);
  }
  return context;
};
