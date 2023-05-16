import { SupabaseError, UserSession } from '@/lib/supabase';
import { WalManagerSupabase } from '@/models';

export type SignInReturn = (email: string, password: string) => Promise<UserSession>;

export const signIn = (supabase: WalManagerSupabase): SignInReturn => {
  return async (email: string, password: string) => {
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new SupabaseError(error);
    }
    return { session, user };
  };
};
