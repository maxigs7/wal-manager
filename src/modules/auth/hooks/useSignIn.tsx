import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ApiError, ISignInParam, ISignInReturn, useSupabaseClient } from '@api';

export const useSignIn = (): UseMutationResult<ISignInReturn, Error, ISignInParam> => {
  const { auth } = useSupabaseClient();
  return useMutation<ISignInReturn, ApiError, ISignInParam>(auth.signIn);
};
