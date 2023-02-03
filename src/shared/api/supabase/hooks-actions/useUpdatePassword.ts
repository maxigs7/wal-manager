import { useCallback } from 'react';

import { SupabaseError, useSupabase } from '@/lib/supabase';

export type UseUpdatePasswordReturn = (newPassword: string) => Promise<void>;

export const useUpdatePassword = (): UseUpdatePasswordReturn => {
  const {
    supabase: { auth },
  } = useSupabase();

  return useCallback(
    async (newPassword: string) => {
      const { error } = await auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new SupabaseError(error);
      }
    },
    [auth],
  );
};
