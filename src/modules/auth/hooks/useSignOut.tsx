import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { ApiError } from '@lib';

export const useSignOut = (): UseMutationResult<void, ApiError, void> => {
  const { auth } = useSupabaseClient();
  return useMutation<void, ApiError, void>(auth.signOut);
};
