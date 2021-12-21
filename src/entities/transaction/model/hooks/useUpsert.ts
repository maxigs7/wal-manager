import { useMutation, UseMutationResult } from 'react-query';

import { Transaction, TransactionForm, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

export default (showToast = true): UseMutationResult<Transaction, ApiError, TransactionForm> => {
  const { transactions } = useApi();
  const toast = useToast();

  return useMutation<Transaction, ApiError, TransactionForm>(transactions.upsert, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha guardado el movimiento correctamente.',
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};
