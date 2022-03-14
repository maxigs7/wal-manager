import { useMutation, UseMutationResult } from 'react-query';

import { ApiError, useApi } from '@api';

import { ISignUpParam, ISignInReturn } from '../api/types';

export const useSignUp = (): UseMutationResult<ISignInReturn, Error, ISignUpParam> => {
  const { auth } = useApi();
  return useMutation<ISignInReturn, ApiError, ISignUpParam>(auth.signUp);
};
