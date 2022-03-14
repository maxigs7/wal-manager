import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { CreditCard } from '@models';

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
