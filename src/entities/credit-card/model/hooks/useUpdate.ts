import { useMutation, UseMutationResult } from 'react-query';

import { CreditCard, useApi } from '@entities';
import { ApiError, useToast } from '@shared';

export default (showToast = true): UseMutationResult<CreditCard, ApiError, CreditCard> => {
  const { creditCards } = useApi();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, CreditCard>(creditCards.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: 'Exito!',
          description: 'Se ha actualizado la cuenta correctamente.',
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: 'Error!', description: error.message });
    },
  });
};
