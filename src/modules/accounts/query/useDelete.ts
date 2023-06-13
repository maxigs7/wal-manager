import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { Account } from '@/models';
import { removeById } from '@/supabase';

type UseAccountDelete = (
  shouldShowToast?: boolean,
) => UseMutationResult<Account, SupabaseError, string>;

const useDelete: UseAccountDelete = (
  shouldShowToast = true,
): UseMutationResult<Account, SupabaseError, string> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.account.toast.removeSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<Account, SupabaseError, string>(removeById<'account'>(supabase, 'account'), {
    onSuccess,
    onError,
  });
};

export default useDelete;
