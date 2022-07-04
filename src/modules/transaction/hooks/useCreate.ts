import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { Transaction } from '@models';

const hook = (showToast = true): UseMutationResult<Transaction, ApiError, Transaction> => {
  const { transactions } = useApi();
  const toast = useToast();

  return useMutation<Transaction, ApiError, Transaction>(transactions.create, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha creado el movimiento correctamente.',
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
