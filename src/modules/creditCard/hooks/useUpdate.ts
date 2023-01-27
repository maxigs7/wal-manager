import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@/api';
import { es } from '@/i18n';
import { ApiError, useToast } from '@/lib';
import { CreditCard, CreditCardUpdate } from '@/models';

const useCreditCardUpdate = (
  showToast = true,
): UseMutationResult<CreditCard, ApiError, CreditCardUpdate> => {
  const { creditCard } = useUow();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, CreditCardUpdate>(creditCard.update, {
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

export default useCreditCardUpdate;
