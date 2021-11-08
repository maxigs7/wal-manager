import { createContext, useContext } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';

interface IProps {
  supabase: SupabaseClient;
}

export const SupabaseContext: React.Context<SupabaseClient> = createContext<SupabaseClient>(
  {} as SupabaseClient,
);

export const SupabaseProvider: React.FC<IProps> = ({ children, supabase }) => (
  <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
);

export const useSupabase: () => SupabaseClient = () => useContext(SupabaseContext);
