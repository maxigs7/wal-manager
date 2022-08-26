import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { Transaction } from '@models';

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
