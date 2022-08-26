import { useMutation, UseMutationResult } from 'react-query';

import { useApi } from '@api';
import { ApiError, useToast } from '@lib';
import { CreditCard } from '@models';

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
