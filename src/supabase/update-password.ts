import { SupabaseError } from '@/lib/supabase';
import { WalManagerSupabase } from '@/models';

export type UpdatePasswordReturn = (newPassword: string) => Promise<void>;

export const updatePassword = (supabase: WalManagerSupabase): UpdatePasswordReturn => {
  return async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw new SupabaseError(error);
    }
  };
};
