'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError, UserSession } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { signUp } from '@/supabase';

import { SignInParam } from '../models';

export const useSignUp = (): UseMutationResult<UserSession, SupabaseError, SignInParam> => {
  const { supabase } = useSupabase();
  return useMutation<UserSession, SupabaseError, SignInParam>((params) =>
    signUp(supabase)(params.email, params.password),
  );
};
