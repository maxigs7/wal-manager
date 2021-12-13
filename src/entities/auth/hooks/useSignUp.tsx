import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@entities';
import { ApiError } from '@shared';

import { ISignUpParam, ISignInReturn } from '../api/types';

export const useSignUp = (): UseMutationResult<ISignInReturn, Error, ISignUpParam> => {
  const { auth } = useApi();
  return useMutation<ISignInReturn, ApiError, ISignUpParam>(auth.signUp);
};
