import { SupabaseError, UserSession } from '@/lib/supabase';
import { WalManagerSupabase } from '@/models';

export type SignUpReturn = (email: string, password: string) => Promise<UserSession>;

export const signUp = (supabase: WalManagerSupabase): SignUpReturn => {
  return async (email: string, password: string) => {
    const {
      error,
      data: { session, user },
    } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new SupabaseError(error);
    }
    return { session, user };
  };
};
