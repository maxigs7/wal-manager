import { SupabaseError } from '@/lib/supabase';
import { WalManagerSupabase } from '@/models';

export type SignOutReturn = () => Promise<void>;

export const signOut = (supabase: WalManagerSupabase): SignOutReturn => {
  return async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new SupabaseError(error);
    }
  };
};
