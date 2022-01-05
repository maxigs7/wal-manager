import { useMutation, UseMutationResult } from 'react-query';

import { CreditCard, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

const hook = (showToast = true): UseMutationResult<CreditCard, ApiError, string> => {
  const { creditCards } = useApi();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, string>(creditCards.remove, {
    onSuccess: () => {
      showToast &&
        toast.success({ title: 'Exito!', description: 'Se ha eliminado la cuenta correctamente.' });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
