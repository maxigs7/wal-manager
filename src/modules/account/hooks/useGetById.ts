import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { Account } from '@models';

import { ACCOUNTS_KEY } from '../constants';

const useGetById = (id?: string): UseQueryResult<Account> => {
  const { accounts } = useSupabaseApi();
  return useQuery([ACCOUNTS_KEY, id], () => accounts.getById(id as string), {
    enabled: !!id,
  });
};

export default useGetById;
