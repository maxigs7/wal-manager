import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { formatISO } from 'date-fns';

import { useUow } from '@api';
import { es } from '@i18n';
import { ApiError, useToast } from '@lib';
import { Movement } from '@models';

import { MovementForm } from '../models';

const useInsert = (showToast = true): UseMutationResult<Movement, ApiError, MovementForm> => {
  const { movement } = useUow();
  const toast = useToast();

  return useMutation<Movement, ApiError, MovementForm>(
    async (data: MovementForm) => {
      const insertedMovement = await movement.rpc<'insertMovement'>('insertMovement', {
        pAccountId: data.accountId,
        pAmount: (data.type === 'expenses' ? (data.amountValue || 0) * -1 : data.amountValue) || 0,
        pCategoryId: data.categoryId,
        pDate: formatISO(data.date),
        pMonth: data.month,
        pType: data.type,
        pUserId: data.userId,
        pYear: data.year,
        pCreateAll: data.createAll || false,
        pCreditCardId: data.creditCardId || null,
        pDescription: data.description || null,
        pDestinationAccountId: data.destinationAccountId || null,
        pFeeNumber: data.feeNumber || null,
        pIsPaid: data.isPaid || false,
        pQuotationAmount: data.quotationAmount || null,
      });
      return (insertedMovement as Movement[])[0];
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

export default useInsert;
