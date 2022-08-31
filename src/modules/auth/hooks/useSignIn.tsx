import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ApiError, ISignInParam, ISignInReturn, useSupabaseApi } from '@api';

export const useSignIn = (): UseMutationResult<ISignInReturn, Error, ISignInParam> => {
  const { auth } = useSupabaseApi();
  return useMutation<ISignInReturn, ApiError, ISignInParam>(auth.signIn);
};
