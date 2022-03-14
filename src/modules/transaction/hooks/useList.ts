import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { TransactionDto } from '@models';

import { TRANSACTIONS_KEY } from '../constants';

const hook = (startDate?: Date, endDate?: Date): UseQueryResult<TransactionDto[]> => {
  const { transactions } = useApi();
  return useQuery(
    [TRANSACTIONS_KEY, startDate, endDate],
    () => transactions.getTransactions(startDate as Date, endDate as Date),
    { enabled: !!startDate && !!endDate },
  );
};

export default hook;
