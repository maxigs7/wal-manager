import { Session, User } from '@supabase/supabase-js';

export interface ISignInReturn {
  session: Session | null;
  user: User | null;
}

export interface ISignInParam {
  email: string;
  password: string;
}

export type ISignUpParam = ISignInParam;
export type ISignUpReturn = ISignInReturn;

export interface IAuthRepository {
  resetPasswordRequest(email: string): Promise<void>;
  signIn(data: ISignInParam): Promise<ISignInReturn>;
  signInGoogle(redirectTo: string): Promise<ISignInReturn>;
  signUp(data: ISignUpParam): Promise<ISignUpReturn>;
  signOut(): Promise<void>;
  updatePassword(newPassword: string): Promise<void>;
}
