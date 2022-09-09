import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Account } from '@models';

const useUpdate = (showToast = true): UseMutationResult<Account, ApiError, Account> => {
  const { accounts } = useSupabaseClient();
  const toast = useToast();

  return useMutation<Account, ApiError, Account>(accounts.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.account.toast.updateSuccess,
        });
    },
    onError: (error: ApiError) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useUpdate;
