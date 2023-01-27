import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { ApiError, UserSession } from '@lib';

import { ISignInParam } from '../models';

export const useSignUp = (): UseMutationResult<UserSession, Error, ISignInParam> => {
  const { auth } = useUow();
  return useMutation<UserSession, ApiError, ISignInParam>((params) =>
    auth.signUp(params.email, params.password),
  );
};
