import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { TransactionDto } from '@models';

import { TRANSACTIONS_KEY } from '../constants';

const hook = (
  accountId?: string,
  startDate?: Date,
  endDate?: Date,
): UseQueryResult<TransactionDto[]> => {
  const { transactions } = useApi();
  return useQuery(
    [TRANSACTIONS_KEY, accountId, startDate, endDate],
    () => transactions.getTransactions(accountId as string, startDate as Date, endDate as Date),
    { enabled: !!startDate && !!endDate && !!accountId },
  );
};

export default hook;
