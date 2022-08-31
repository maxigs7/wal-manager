import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ISignUpParam, ISignUpReturn, useSupabaseApi } from '@api';
import { ApiError } from '@lib';

export const useSignUp = (): UseMutationResult<ISignUpReturn, Error, ISignUpParam> => {
  const { auth } = useSupabaseApi();
  return useMutation<ISignUpReturn, ApiError, ISignUpParam>(auth.signUp);
};
