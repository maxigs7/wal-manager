import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Transaction } from '@models';

import { TRANSACTIONS_KEY } from '../constants';

const hook = (id?: string): UseQueryResult<Transaction> => {
  const { transactions } = useApi();
  return useQuery([TRANSACTIONS_KEY, id], () => transactions.getById(id as string), {
    enabled: !!id,
  });
};

export default hook;
