'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { resetPasswordForEmail } from '@/supabase';

export const useResetPasswordRequest = (): UseMutationResult<void, SupabaseError, string> => {
  const { supabase } = useSupabase();
  return useMutation<void, SupabaseError, string>(resetPasswordForEmail(supabase));
};
