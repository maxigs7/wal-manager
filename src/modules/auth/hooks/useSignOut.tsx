import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { ApiError } from '@lib';

export const useSignOut = (): UseMutationResult<void, ApiError, void> => {
  const { auth } = useSupabaseApi();
  return useMutation<void, ApiError, void>(auth.signOut);
};
