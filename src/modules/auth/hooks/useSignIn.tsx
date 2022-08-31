import { ApiError, ISignInParam, ISignInReturn, useSupabaseApi } from '@api';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const useSignIn = (): UseMutationResult<ISignInReturn, Error, ISignInParam> => {
  const { auth } = useSupabaseApi();
  return useMutation<ISignInReturn, ApiError, ISignInParam>(auth.signIn);
};
