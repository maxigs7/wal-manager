import { useMutation, UseMutationResult } from 'react-query';

import { ApiError, useApi } from '@api';

import { ISignInParam, ISignInReturn } from '../api/types';

export const useSignIn = (): UseMutationResult<ISignInReturn, Error, ISignInParam> => {
  const { auth } = useApi();
  return useMutation<ISignInReturn, ApiError, ISignInParam>(auth.signIn);
};
