import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { Account, AccountInsert } from '@/models';
import { useUow } from '@/shared';

const useAccountInsert = (
  showToast = true,
): UseMutationResult<Account, SupabaseError, AccountInsert> => {
  const { account } = useUow();
  const toast = useToast();

  return useMutation<Account, SupabaseError, AccountInsert>(account.insert, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.account.toast.createSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useAccountInsert;
