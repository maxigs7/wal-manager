import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@/api';
import { es } from '@/i18n';
import { ApiError, useToast } from '@/lib';
import { CreditCard } from '@/models';

const useCreditCardDelete = (showToast = true): UseMutationResult<CreditCard, ApiError, string> => {
  const { creditCard } = useUow();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, string>(creditCard.removeById, {
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

export default useCreditCardDelete;
