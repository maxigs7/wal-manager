import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { Account } from '@/models';
import { useUow } from '@/shared';

const useAccountDelete = (showToast = true): UseMutationResult<Account, SupabaseError, string> => {
  const { account } = useUow();
  const toast = useToast();

  return useMutation<Account, SupabaseError, string>(account.removeById, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.account.toast.removeSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useAccountDelete;
