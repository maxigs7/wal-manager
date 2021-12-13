import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@entities';
import { ApiError } from '@shared';

import { ISignInParam, ISignInReturn } from '../api/types';

export const useSignIn = (): UseMutationResult<ISignInReturn, Error, ISignInParam> => {
  const { auth } = useApi();
  return useMutation<ISignInReturn, ApiError, ISignInParam>(auth.signIn);
};
