import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { Transaction } from '@models';

import { TRANSACTIONS_KEY } from '../constants';

const useGetById = (id?: string): UseQueryResult<Transaction> => {
  const { transactions } = useSupabaseClient();
  return useQuery([TRANSACTIONS_KEY, id], () => transactions.getById(id as string), {
    enabled: !!id,
  });
};

export default useGetById;
