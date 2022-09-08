import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ApiError, useSupabaseApi } from '@api';

export const useResetPasswordRequest = (): UseMutationResult<void, Error, string> => {
  const { auth } = useSupabaseApi();
  return useMutation<void, ApiError, string>(auth.resetPasswordRequest);
};
