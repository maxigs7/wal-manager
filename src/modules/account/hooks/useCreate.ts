import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Account } from '@models';

const useCreate = (showToast = true): UseMutationResult<Account, ApiError, Account> => {
  const { accounts } = useSupabaseClient();
  const toast = useToast();

  return useMutation<Account, ApiError, Account>(accounts.create, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.account.toast.createSuccess,
        });
    },
    onError: (error: ApiError) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useCreate;
