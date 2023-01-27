import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { ApiError, useUow } from '@api';
import { UserSession } from '@lib';

import { ISignInParam } from '../models';

export const useSignIn = (): UseMutationResult<UserSession, Error, ISignInParam> => {
  const { auth } = useUow();
  return useMutation<UserSession, ApiError, ISignInParam>((params) =>
    auth.signIn(params.email, params.password),
  );
};
