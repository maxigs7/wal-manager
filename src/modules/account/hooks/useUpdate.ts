import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@/api';
import { es } from '@/i18n';
import { ApiError, useToast } from '@/lib';
import { Account, AccountUpdate } from '@/models';

const useAccountUpdate = (
  showToast = true,
): UseMutationResult<Account, ApiError, AccountUpdate> => {
  const { account } = useUow();
  const toast = useToast();

  return useMutation<Account, ApiError, AccountUpdate>(account.update, {
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
