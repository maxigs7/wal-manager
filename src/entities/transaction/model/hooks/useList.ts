import { useQuery, UseQueryResult } from 'react-query';

import { TransactionDto, useApi } from '@entities';

import { TRANSACTIONS_KEY } from '../../config/constants';

const hook = (startDate?: Date, endDate?: Date): UseQueryResult<TransactionDto[]> => {
  const { transactions } = useApi();
  return useQuery(
    [TRANSACTIONS_KEY, startDate, endDate],
    () => transactions.getTransactions(startDate as Date, endDate as Date),
    { enabled: !!startDate && !!endDate },
  );
};

export default hook;
