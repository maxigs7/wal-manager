import { useMemo } from 'react';
import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { useRouter } from '@hooks';

import { ISignInReturn, ISignUpParam } from '.';
import { ISignInParam } from './types';

interface IAuthMutation {
  signIn: UseMutationResult<ISignInReturn, Error, ISignInParam>;
  signInGoogle: UseMutationResult<ISignInReturn, Error, string>;
  signOut: UseMutationResult<{ error: Error | null }, unknown, void>;
  signUp: UseMutationResult<ISignInReturn, Error, ISignInParam>;
}

export const useAuthApi = (): IAuthMutation => {
  const { auth } = useApi();
  const { push } = useRouter();
  const signIn = useMutation<ISignInReturn, Error, ISignInParam>(auth.signIn, {
    onSuccess: () => {
      push('/dashboard');
    },
    onError: () => {
      console.log('error');
    },
  });

  const signInGoogle = useMutation<ISignInReturn, Error, string>(auth.signInGoogle, {
    onSuccess: (user) => {
      console.log(user);
    },
    onError: () => {
      console.log('error');
    },
  });

  const signUp = useMutation<ISignInReturn, Error, ISignUpParam>(auth.signUp, {
    onSuccess: () => {
      push('/dashboard');
    },
    onError: () => {
      console.log('error');
    },
  });

  const signOut = useMutation<{ error: Error | null }>(auth.signOut, {
    onSuccess: () => {
      push('/auth/sign-in');
    },
    onError: () => {
      console.log('error');
    },
  });

  return useMemo(
    () => ({
      signIn,
      signInGoogle,
      signOut,
      signUp,
    }),
    [signIn, signInGoogle, signUp, signOut],
  );
};
