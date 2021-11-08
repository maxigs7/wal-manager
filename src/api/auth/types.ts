import { Session, User } from '@supabase/supabase-js';

export interface ISignInReturn {
  session: Session | null;
  user: User | null;
  error: Error | null;
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
  signOut(): Promise<{ error: Error | null }>;
}
