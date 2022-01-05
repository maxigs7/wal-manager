import { useMutation, UseMutationResult } from 'react-query';

import { CreditCard, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

const hook = (showToast = true): UseMutationResult<CreditCard, ApiError, CreditCard> => {
  const { creditCards } = useApi();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, CreditCard>(creditCards.create, {
    onSuccess: () => {
      showToast &&
        toast.success({ title: 'Exito!', description: 'Se ha creado la tarjeta correctamente.' });
    },
    onError: (error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};

export default hook;
