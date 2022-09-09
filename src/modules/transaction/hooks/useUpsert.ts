import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Transaction, TransactionForm } from '@models';

const useUpsert = (showToast = true): UseMutationResult<Transaction, ApiError, TransactionForm> => {
  const { transactions } = useSupabaseClient();
  const toast = useToast();

  return useMutation<Transaction, ApiError, TransactionForm>(transactions.upsert, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.transaction.toast.saveSuccess,
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useUpsert;
