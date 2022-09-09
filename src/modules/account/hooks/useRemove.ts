import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Account } from '@models';

const useRemove = (showToast = true): UseMutationResult<Account, ApiError, string> => {
  const { accounts } = useSupabaseClient();
  const toast = useToast();

  return useMutation<Account, ApiError, string>(accounts.remove, {
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

export default useRemove;
