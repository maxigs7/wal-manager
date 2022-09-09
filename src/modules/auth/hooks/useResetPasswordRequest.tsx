import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ApiError, useSupabaseClient } from '@api';

export const useResetPasswordRequest = (): UseMutationResult<void, Error, string> => {
  const { auth } = useSupabaseClient();
  return useMutation<void, ApiError, string>(auth.resetPasswordRequest);
};
