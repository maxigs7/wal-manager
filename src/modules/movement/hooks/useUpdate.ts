import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { formatISO } from 'date-fns';


import { useUow } from '@/api';
import { es } from '@/i18n';
import { ApiError, useToast } from '@/lib';
import { Movement } from '@/models';

import { MovementForm } from '../models';

const useUpdate = (showToast = true): UseMutationResult<Movement, ApiError, MovementForm> => {
  const { movement } = useUow();
  const toast = useToast();

  return useMutation<Movement, ApiError, MovementForm>(
    async (data: MovementForm) => {
      const updatedMovement = await movement.rpc<'updateMovement'>('updateMovement', {
        pAmount: (data.amount < 0 ? (data.amountValue || 0) * -1 : data.amountValue) || 0,
        pCategoryId: data.categoryId,
        pDate: formatISO(data.date),
        pId: data.id,
        pMonth: data.month,
        pYear: data.year,
        pCreditCardId: data.creditCardId || null,
        pDescription: data.description || null,
        pFeeNumber: data.feeNumber || null,
        pIsPaid: data.isPaid || false,
      });
      return (updatedMovement as Movement[])[0];
    },
    {
      onSuccess: () => {
        showToast &&
          toast.success({
            title: es.common.toast.success,
            description: es.movement.toast.saveSuccess,
          });
      },
      onError: (error: Error) => {
        showToast && toast.error({ title: es.common.toast.error, description: error.message });
      },
    },
  );
};

export default useUpdate;
