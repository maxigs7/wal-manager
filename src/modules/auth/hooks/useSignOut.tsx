import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError } from '@/lib/supabase';
import { useUow } from '@/shared';

export const useSignOut = (): UseMutationResult<void, SupabaseError, void> => {
  const { auth } = useUow();
  return useMutation<void, SupabaseError, void>(auth.signOut);
};
