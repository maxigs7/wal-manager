import { useCallback } from 'react';

import { ApiError, UserSession, useSupabase } from '@lib';

export type UseSignInReturn = (email: string, password: string) => Promise<UserSession>;

export const useSignIn = (): UseSignInReturn => {
  const { auth } = useSupabase();

  return useCallback(
    async (email: string, password: string) => {
      const {
        data: { session, user },
        error,
      } = await auth.signInWithPassword({ email, password });
      if (error) {
        throw new ApiError(error);
      }
      return { session, user };
    },
    [auth],
  );
};
