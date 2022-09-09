import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ISignUpParam, ISignUpReturn, useSupabaseClient } from '@api';
import { ApiError } from '@lib';

export const useSignUp = (): UseMutationResult<ISignUpReturn, Error, ISignUpParam> => {
  const { auth } = useSupabaseClient();
  return useMutation<ISignUpReturn, ApiError, ISignUpParam>(auth.signUp);
};
