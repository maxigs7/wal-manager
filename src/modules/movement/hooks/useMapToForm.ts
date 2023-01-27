import { useCallback } from 'react';

import { parseISO } from 'date-fns';

import { Movement, MovementFee } from '@/models';

import { MovementForm } from '../models';


type UseMappingReturn = (movement: Movement, fee?: Partial<MovementFee>) => Partial<MovementForm>;

const useMapToForm = (): UseMappingReturn => {
  return useCallback((movement: Movement, fee?: Partial<MovementFee>): Partial<MovementForm> => {
    return {
      accountId: movement.accountId,
      amount: movement.amount,
      categoryId: movement.categoryId,
      creditCardId: movement.creditCardId || undefined,
      date: parseISO(movement.date),
      description: movement.description || undefined,
      id: movement.id,
      isPaid: movement.isPaid,
      month: movement.month,
      type: movement.type,
      userId: movement.userId,
      year: movement.year,
      amountValue: Math.abs(movement.amount),
      feeNumber: fee?.feeNumber,
    };
  }, []);
};

export default useMapToForm;
