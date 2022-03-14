import { useCallback } from 'react';

import { differenceInDays, setDate } from 'date-fns';

import { Transaction, TransactionForm } from '@models';

type UseMappingReturn = (transaction: Transaction) => Partial<TransactionForm>;

const hook = (defaultDate: Date): UseMappingReturn => {
  return useCallback(
    (transaction: Transaction): Partial<TransactionForm> => {
      const { date, id, isRecurring, parentTransactionId } = transaction;
      const currentDate = setDate(defaultDate, date.getDate());
      const isOriginal = differenceInDays(currentDate, date) <= 1;

      return {
        ...transaction,
        date: isOriginal ? date : currentDate,
        id: isOriginal ? id : undefined,
        isRecurring: isOriginal ? isRecurring : false,
        parentTransactionId: isRecurring && !isOriginal ? id : parentTransactionId,
      };
    },
    [defaultDate],
  );
};

export default hook;
