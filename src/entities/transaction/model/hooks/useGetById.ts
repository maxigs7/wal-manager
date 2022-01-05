import { useQuery, UseQueryResult } from 'react-query';

import { Transaction, useApi } from '@entities';

import { TRANSACTIONS_KEY } from '../../config/constants';

const hook = (id?: string): UseQueryResult<Transaction> => {
  const { transactions } = useApi();
  return useQuery([TRANSACTIONS_KEY, id], () => transactions.getById(id as string), {
    enabled: !!id,
  });
};

export default hook;
