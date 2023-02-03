import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError } from '@/lib/supabase';
import { useUow } from '@/shared';

export const useResetPasswordRequest = (): UseMutationResult<void, SupabaseError, string> => {
  const { auth } = useUow();
  return useMutation<void, SupabaseError, string>(auth.resetPassword);
};
