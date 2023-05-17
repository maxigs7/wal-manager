'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError, UserSession } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { signIn } from '@/supabase';

import { SignInParam } from '../models';

export const useSignIn = (): UseMutationResult<UserSession, Error, SignInParam> => {
  const { supabase } = useSupabase();
  return useMutation<UserSession, SupabaseError, SignInParam>((params) =>
    signIn(supabase)(params.email, params.password),
  );
};
