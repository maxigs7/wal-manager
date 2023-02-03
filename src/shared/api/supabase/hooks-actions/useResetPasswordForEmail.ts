import { useCallback } from 'react';

import { SupabaseError, useSupabase } from '@/lib/supabase';
import { BASE_URL } from '@/shared';

export type UseResetPasswordForEmailReturn = (email: string) => Promise<void>;

export const useResetPasswordForEmail = (): UseResetPasswordForEmailReturn => {
  const {
    supabase: { auth },
  } = useSupabase();

  return useCallback(
    async (email: string) => {
      const { error } = await auth.resetPasswordForEmail(email, {
        redirectTo: `${BASE_URL}/auth/reset-password/confirm`,
      });

      if (error) {
        throw new SupabaseError(error);
      }
    },
    [auth],
  );
};
