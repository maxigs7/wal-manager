import { useQuery, UseQueryResult } from 'react-query';

import { Account } from '@models/accounts';

import { useApi } from '..';

export const useAccountById = (id?: string): UseQueryResult<Account> => {
  const { accounts } = useApi();
  return useQuery(['accounts', id], () => accounts.getById(id as string), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
