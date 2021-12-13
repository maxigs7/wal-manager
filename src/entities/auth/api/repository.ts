import { SupabaseClient } from '@supabase/supabase-js';

import { ApiError } from '@shared';

import { IAuthRepository, ISignInReturn } from './types';

export const authRepository = ({ auth }: SupabaseClient): IAuthRepository => {
  return {
    signIn: async ({ email, password }): Promise<ISignInReturn> => {
      const { error, session, user } = await auth.signIn({ email, password });
      if (error) {
        throw new ApiError(error);
      }
      return { session, user };
    },
    signInGoogle: async (redirectTo: string): Promise<ISignInReturn> => {
      const { error, session, user } = await auth.signIn({ provider: 'google' }, { redirectTo });
      if (error) {
        throw new ApiError(error);
      }
      return { session, user };
    },
    signUp: async ({ email, password }): Promise<ISignInReturn> => {
      const { error, session, user } = await auth.signUp({ email, password });
      if (error) {
        throw new ApiError(error);
      }
      return { session, user };
    },
    signOut: async (): Promise<void> => {
      const { error } = await auth.signOut();
      if (error) {
        throw new ApiError(error);
      }
    },
  };
};
