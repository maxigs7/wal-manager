import { useContext } from 'react';

import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseContext } from '../providers/supabase';

export default (): SupabaseClient => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error(`useSupabase must be used within a SupabaseProvider.`);
  }
  return context;
};
