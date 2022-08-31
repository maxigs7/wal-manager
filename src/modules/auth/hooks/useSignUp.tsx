import { ApiError } from '@lib';
import { ISignUpParam, ISignUpReturn, useSupabaseApi } from '@api';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const useSignUp = (): UseMutationResult<ISignUpReturn, Error, ISignUpParam> => {
  const { auth } = useSupabaseApi();
  return useMutation<ISignUpReturn, ApiError, ISignUpParam>(auth.signUp);
};
