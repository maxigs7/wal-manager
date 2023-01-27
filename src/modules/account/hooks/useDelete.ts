import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@/api';
import { es } from '@/i18n';
import { ApiError, useToast } from '@/lib';
import { Account } from '@/models';

const useAccountDelete = (showToast = true): UseMutationResult<Account, ApiError, string> => {
  const { account } = useUow();
  const toast = useToast();

  return useMutation<Account, ApiError, string>(account.removeById, {
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
