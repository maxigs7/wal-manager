'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError, UserSession } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { signUp } from '@/supabase';

import { ISignInParam } from '../models';

export const useSignUp = (): UseMutationResult<UserSession, SupabaseError, ISignInParam> => {
  const { supabase } = useSupabase();
  return useMutation<UserSession, SupabaseError, ISignInParam>((params) =>
    signUp(supabase)(params.email, params.password),
  );
};
