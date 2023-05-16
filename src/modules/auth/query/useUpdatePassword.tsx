import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { updatePassword } from '@/supabase';

export const useUpdatePassword = (): UseMutationResult<void, SupabaseError, string> => {
  const { supabase } = useSupabase();
  return useMutation<void, SupabaseError, string>(updatePassword(supabase));
};
