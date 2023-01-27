import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { CreditCard, CreditCardInsert } from '@models';

const useCreditCardInsert = (
  showToast = true,
): UseMutationResult<CreditCard, ApiError, CreditCardInsert> => {
  const { creditCard } = useUow();
  const toast = useToast();

  return useMutation<CreditCard, ApiError, CreditCardInsert>(creditCard.insert, {
    onSuccess: () => {
      showToast &&
        toast.success({
          title: es.common.toast.success,
          description: es.creditCard.toast.createSuccess,
        });
    },
    onError: (error) => {
      showToast && toast.error({ title: es.common.toast.error, description: error.message });
    },
  });
};

export default useCreditCardInsert;
