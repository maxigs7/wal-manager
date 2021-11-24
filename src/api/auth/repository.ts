import { SupabaseClient } from '@supabase/supabase-js';

import { IAuthError, IAuthRepository, ISignInReturn } from './types';

export const buildAuthRepository = ({ auth }: SupabaseClient): IAuthRepository => {
  return {
    signIn: ({ email, password }): Promise<ISignInReturn> => {
      return auth.signIn({ email, password });
    },
    signInGoogle: (redirectTo: string): Promise<ISignInReturn> => {
      return auth.signIn({ provider: 'google' }, { redirectTo });
    },
    signUp: ({ email, password }): Promise<ISignInReturn> => {
      return auth.signUp({ email, password });
    },
    signOut: (): Promise<IAuthError> => {
      return auth.signOut();
    },
  };
};
