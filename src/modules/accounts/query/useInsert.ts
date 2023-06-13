import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { useSupabase } from '@/lib/supabase/provider';
import { Account, AccountInsert } from '@/models';
import { insert } from '@/supabase';

type UseAccountInsert = (
  shouldShowToast?: boolean,
) => UseMutationResult<Account, SupabaseError, AccountInsert>;

const useInsert: UseAccountInsert = (
  shouldShowToast = true,
): UseMutationResult<Account, SupabaseError, AccountInsert> => {
  const { supabase } = useSupabase();
  const toast = useToast();

  const onSuccess = () => {
    shouldShowToast &&
      toast.success({
        title: es.common.toast.success,
        description: es.account.toast.createSuccess,
      });
  };

  const onError = (error: SupabaseError) => {
    shouldShowToast && toast.error({ title: es.common.toast.error, description: error.message });
  };

  return useMutation<Account, SupabaseError, AccountInsert>(
    insert<'account'>(supabase, 'account'),
    {
      onSuccess,
      onError,
    },
  );
};

export default useInsert;
