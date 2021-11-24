import { useQuery, useQueryClient, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { TransactionDto } from '@models';

import { TRANSACTIONS_KEY } from './constants';

export const useTransactionList = (
  startDate: Date,
  endDate: Date,
): UseQueryResult<TransactionDto[]> => {
  const { transactions } = useApi();
  return useQuery([TRANSACTIONS_KEY, startDate, endDate], () =>
    transactions.getTransactions(startDate, endDate),
  );
};

export const useTransactionRefresh = (): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(TRANSACTIONS_KEY, { exact: true, refetchInactive: true });
  };
};
