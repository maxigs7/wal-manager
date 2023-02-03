import { useCallback } from 'react';

import { SupabaseError, UserSession, useSupabase } from '@/lib/supabase';

export type UseSignUpReturn = (email: string, password: string) => Promise<UserSession>;

export const useSignUp = (): UseSignUpReturn => {
  const {
    supabase: { auth },
  } = useSupabase();

  return useCallback(
    async (email: string, password: string) => {
      const {
        error,
        data: { session, user },
      } = await auth.signUp({ email, password });
      if (error) {
        throw new SupabaseError(error);
      }
      return { session, user };
    },
    [auth],
  );
};
