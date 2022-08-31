import { ApiError } from '@lib';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  IAuthRepository,
  ISignInParam,
  ISignInReturn,
  ISignUpParam,
  ISignUpReturn,
} from './auth.types';

export class AuthRepository implements IAuthRepository {
  constructor(private supabase: SupabaseClient) {}

  private get auth() {
    return this.supabase.auth;
  }
  signIn = async ({ email, password }: ISignInParam): Promise<ISignInReturn> => {
    const {
      data: { session, user },
      error,
    } = await this.auth.signInWithPassword({ email, password });
    if (error) {
      throw new ApiError(error);
    }
    return { session, user };
  };

  signInGoogle = async (redirectTo: string): Promise<ISignInReturn> => {
    throw new Error('Method not implemented.');
    //  const { error, session, user } = await auth.signIn({ provider: 'google' }, { redirectTo });
    //  if (error) {
    //    throw new ApiError(error);
    //  }
    //  return { session, user };
  };

  signUp = async ({ email, password }: ISignUpParam): Promise<ISignUpReturn> => {
    const {
      error,
      data: { session, user },
    } = await this.auth.signUp({ email, password });
    if (error) {
      throw new ApiError(error);
    }
    return { session, user };
  };

  signOut = async (): Promise<void> => {
    const { error } = await this.auth.signOut();
    if (error) {
      throw new ApiError(error);
    }
  };
}
