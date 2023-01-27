import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ApiError, useUow } from '@/api';

export const useResetPasswordRequest = (): UseMutationResult<void, Error, string> => {
  const { auth } = useUow();
  return useMutation<void, ApiError, string>(auth.resetPassword);
};
