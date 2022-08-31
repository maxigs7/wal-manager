import { createContext, PropsWithChildren, useContext } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';

interface IProps extends PropsWithChildren {
  supabase: SupabaseClient;
}

export const SupabaseContext: React.Context<SupabaseClient> = createContext<SupabaseClient>(
  {} as SupabaseClient,
);

export const SupabaseProvider: React.FC<IProps> = ({ children, supabase }) => (
  <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
);

export const useSupabase = (): SupabaseClient => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error(`useSupabase must be used within a SupabaseProvider.`);
  }
  return context;
};
