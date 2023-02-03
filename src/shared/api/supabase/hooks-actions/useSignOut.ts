import { useCallback } from 'react';

import { SupabaseError, useSupabase } from '@/lib/supabase';

export type UseSignOutReturn = () => Promise<void>;

export const useSignOut = (): UseSignOutReturn => {
  const {
    supabase: { auth },
  } = useSupabase();

  return useCallback(async () => {
    const { error } = await auth.signOut();
    if (error) {
      throw new SupabaseError(error);
    }
  }, [auth]);
};
