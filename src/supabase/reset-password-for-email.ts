import { SupabaseError } from '@/lib/supabase';
import { BASE_URL } from '@/m/shared/config';
import { WalManagerSupabase } from '@/models';

export type ResetPasswordForEmailReturn = (email: string) => Promise<void>;

export const resetPasswordForEmail = (
  supabase: WalManagerSupabase,
): ResetPasswordForEmailReturn => {
  return async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${BASE_URL}/auth/reset-password/confirm`,
    });

    if (error) {
      throw new SupabaseError(error);
    }
  };
};
