import { useCallback } from 'react';

import { ApiError, useSupabase } from '@/lib';
import { BASE_URL } from '@/shared';

export type UseResetPasswordForEmailReturn = (email: string) => Promise<void>;

export const useResetPasswordForEmail = (): UseResetPasswordForEmailReturn => {
  const { auth } = useSupabase();

  return useCallback(
    async (email: string) => {
      const { error } = await auth.resetPasswordForEmail(email, {
        redirectTo: `${BASE_URL}/auth/reset-password/confirm`,
      });

      if (error) {
        throw new ApiError(error);
      }
    },
    [auth],
  );
};
