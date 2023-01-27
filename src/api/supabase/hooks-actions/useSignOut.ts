import { useCallback } from 'react';

import { ApiError, useSupabase } from '@/lib';

export type UseSignOutReturn = () => Promise<void>;

export const useSignOut = (): UseSignOutReturn => {
  const { auth } = useSupabase();

  return useCallback(async () => {
    const { error } = await auth.signOut();
    if (error) {
      throw new ApiError(error);
    }
  }, [auth]);
};
