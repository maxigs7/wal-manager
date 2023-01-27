import { useCallback } from 'react';

import { ApiError, UserSession, useSupabase } from '@lib';

export type UseSignUpReturn = (email: string, password: string) => Promise<UserSession>;

export const useSignUp = (): UseSignUpReturn => {
  const { auth } = useSupabase();

  return useCallback(
    async (email: string, password: string) => {
      const {
        error,
        data: { session, user },
      } = await auth.signUp({ email, password });
      if (error) {
        throw new ApiError(error);
      }
      return { session, user };
    },
    [auth],
  );
};
