import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { CreditCard } from '@models';

const useUpdate = (showToast = true): UseMutationResult<CreditCard, ApiError, CreditCard> => {
  const { creditCards } = useSupabaseApi();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, CreditCard>(creditCards.update, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.creditCard.toast.updateSuccess,
        });
    },
    onError: (error: Error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useUpdate;
