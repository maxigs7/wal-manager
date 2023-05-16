'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { signOut } from '@/supabase';

export const useSignOut = (): UseMutationResult<void, SupabaseError, void> => {
  const { supabase } = useSupabase();
  return useMutation<void, SupabaseError, void>(signOut(supabase));
};
