import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { CreditCard } from '@models';

const useRemove = (showToast = true): UseMutationResult<CreditCard, ApiError, string> => {
  const { creditCards } = useSupabaseApi();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, string>(creditCards.remove, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.creditCard.toast.removeSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useRemove;