import { useMemo } from 'react';
import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { useRouter } from '@hooks';

import { ISignInReturn, ISignUpParam } from '.';
import { IAuthError, ISignInParam } from './types';

interface IAuthMutation {
  signIn: UseMutationResult<ISignInReturn, Error, ISignInParam>;
  signInGoogle: UseMutationResult<ISignInReturn, Error, string>;
  signOut: UseMutationResult<IAuthError, unknown, void>;
  signUp: UseMutationResult<ISignInReturn, Error, ISignInParam>;
}

export const useAuthApi = (): IAuthMutation => {
  const { auth } = useApi();
  const { navigate } = useRouter();
  const signIn = useMutation<ISignInReturn, Error, ISignInParam>(auth.signIn, {
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: () => {
      console.log('error');
    },
  });

  const signInGoogle = useMutation<ISignInReturn, Error, string>(auth.signInGoogle, {
    onSuccess: (user: any) => {
      console.log(user);
    },
    onError: () => {
      console.log('error');
    },
  });

  const signUp = useMutation<ISignInReturn, Error, ISignUpParam>(auth.signUp, {
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: () => {
      console.log('error');
    },
  });

  const signOut = useMutation<IAuthError>(auth.signOut, {
    onSuccess: () => {
      navigate('/auth');
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
