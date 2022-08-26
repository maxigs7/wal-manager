import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { Transaction, TransactionForm } from '@models';

const hook = (showToast = true): UseMutationResult<Transaction, ApiError, TransactionForm> => {
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

export default hook;
