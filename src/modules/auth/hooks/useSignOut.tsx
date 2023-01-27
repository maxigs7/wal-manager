import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@/api';
import { ApiError } from '@/lib';

export const useSignOut = (): UseMutationResult<void, ApiError, void> => {
  const { auth } = useUow();
  return useMutation<void, ApiError, void>(auth.signOut);
};
