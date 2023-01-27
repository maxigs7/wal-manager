import { useCallback } from 'react';

import { ApiError, useSupabase } from '@lib';

export type UseUpdatePasswordReturn = (newPassword: string) => Promise<void>;

export const useUpdatePassword = (): UseUpdatePasswordReturn => {
  const { auth } = useSupabase();

  return useCallback(
    async (newPassword: string) => {
      const { error } = await auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new ApiError(error);
      }
    },
    [auth],
  );
};
