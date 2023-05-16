'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError, UserSession } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { signIn } from '@/supabase';

import { ISignInParam } from '../models';

export const useSignIn = (): UseMutationResult<UserSession, Error, ISignInParam> => {
  const { supabase } = useSupabase();
  return useMutation<UserSession, SupabaseError, ISignInParam>((params) =>
    signIn(supabase)(params.email, params.password),
  );
};
