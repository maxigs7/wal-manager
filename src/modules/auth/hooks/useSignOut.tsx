import { useSupabaseApi } from '@api';
import { ApiError } from '@lib';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const useSignOut = (): UseMutationResult<void, ApiError, void> => {
  const { auth } = useSupabaseApi();
  return useMutation<void, ApiError, void>(auth.signOut);
};
