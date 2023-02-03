import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError, UserSession } from '@/lib/supabase';
import { useUow } from '@/shared';

import { ISignInParam } from '../models';

export const useSignUp = (): UseMutationResult<UserSession, SupabaseError, ISignInParam> => {
  const { auth } = useUow();
  return useMutation<UserSession, SupabaseError, ISignInParam>((params) =>
    auth.signUp(params.email, params.password),
  );
};
