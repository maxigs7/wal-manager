import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Transaction } from '@models';

const useRemove = (showToast = true): UseMutationResult<Transaction, ApiError, string> => {
  const { transactions } = useSupabaseClient();
  const toast = useToast();

  return useMutation<Transaction, ApiError, string>(transactions.remove, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.transaction.toast.removeSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useRemove;
