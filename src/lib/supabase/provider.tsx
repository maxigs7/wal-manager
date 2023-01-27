import { createContext, PropsWithChildren, useContext } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@models';

interface IProps extends PropsWithChildren {
  supabase: SupabaseClient<Database>;
}

export const SupabaseContext: React.Context<SupabaseClient<Database>> = createContext<
  SupabaseClient<Database>
>({} as SupabaseClient<Database>);

export const SupabaseProvider: React.FC<IProps> = ({ children, supabase }) => (
  <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
);

export const useSupabase = (): SupabaseClient<Database> => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error(`useSupabase must be used within a SupabaseProvider.`);
  }
  return context;
};
