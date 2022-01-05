import { useMutation, UseMutationResult } from 'react-query';

import { Transaction, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

const hook = (showToast = true): UseMutationResult<Transaction, ApiError, string> => {
  const { transactions } = useApi();
  const toast = useToast();

  return useMutation<Transaction, ApiError, string>(transactions.remove, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha eliminado el movimiento correctamente.',
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
