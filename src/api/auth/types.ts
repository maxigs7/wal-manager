import { Session, User, ApiError } from '@supabase/supabase-js';

export type IAuthError = { error: ApiError | null };

export interface ISignInReturn extends IAuthError {
  session: Session | null;
  user: User | null;
}

export interface ISignInParam {
  email: string;
  password: string;
  redirectTo: string;
}

export type ISignUpParam = ISignInParam;

export interface IAuthRepository {
  signIn(data: ISignInParam): Promise<ISignInReturn>;
  signInGoogle(redirectTo: string): Promise<ISignInReturn>;
  signUp(data: ISignUpParam): Promise<ISignInReturn>;
  signOut(): Promise<IAuthError>;
}
