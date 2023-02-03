import { useCallback } from 'react';

import { SupabaseError, UserSession, useSupabase } from '@/lib/supabase';

export type UseSignInReturn = (email: string, password: string) => Promise<UserSession>;

export const useSignIn = (): UseSignInReturn => {
  const {
    supabase: { auth },
  } = useSupabase();

  return useCallback(
    async (email: string, password: string) => {
      const {
        data: { session, user },
        error,
      } = await auth.signInWithPassword({ email, password });
      if (error) {
        throw new SupabaseError(error);
      }
      return { session, user };
    },
    [auth],
  );
};
