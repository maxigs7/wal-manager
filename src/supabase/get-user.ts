import { User } from '@supabase/supabase-js';

import { WalManagerSupabase } from '@/models';

export const getUser = async (supabase: WalManagerSupabase): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
