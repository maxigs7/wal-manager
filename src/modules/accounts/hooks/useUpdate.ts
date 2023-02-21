import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { es } from '@/i18n';
import { useToast } from '@/lib/chakra-ui';
import { SupabaseError } from '@/lib/supabase';
import { Account, AccountUpdate } from '@/models';
import { useUow } from '@/shared';

const useAccountUpdate = (
  showToast = true,
): UseMutationResult<Account, SupabaseError, AccountUpdate> => {
  const { account } = useUow();
  const toast = useToast();

  return useMutation<Account, SupabaseError, AccountUpdate>(account.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.account.toast.updateSuccess,
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useAccountUpdate;
