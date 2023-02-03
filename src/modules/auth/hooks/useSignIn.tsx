import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError, UserSession } from '@/lib/supabase';
import { useUow } from '@/shared';

import { ISignInParam } from '../models';

export const useSignIn = (): UseMutationResult<UserSession, Error, ISignInParam> => {
  const { auth } = useUow();
  return useMutation<UserSession, SupabaseError, ISignInParam>((params) =>
    auth.signIn(params.email, params.password),
  );
};
