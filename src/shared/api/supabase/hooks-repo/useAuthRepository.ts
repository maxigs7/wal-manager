import { useMemo } from 'react';

import {
  UseResetPasswordForEmailReturn,
  UseSignInReturn,
  UseSignOutReturn,
  UseSignUpReturn,
  UseUpdatePasswordReturn,
  useResetPasswordForEmail,
  useSignIn,
  useSignOut,
  useSignUp,
  useUpdatePassword,
} from '../hooks-actions';

export type UseAuthRepositoryReturn = {
  resetPassword: UseResetPasswordForEmailReturn;
  signIn: UseSignInReturn;
  signOut: UseSignOutReturn;
  signUp: UseSignUpReturn;
  updatePassword: UseUpdatePasswordReturn;
};

export const useAuthRepository = (): UseAuthRepositoryReturn => {
  const resetPassword = useResetPasswordForEmail();
  const signIn = useSignIn();
  const signOut = useSignOut();
  const signUp = useSignUp();
  const updatePassword = useUpdatePassword();

  return useMemo(
    () => ({
      resetPassword,
      signIn,
      signOut,
      signUp,
      updatePassword,
    }),
    [resetPassword, signIn, signOut, signUp, updatePassword],
  );
};
