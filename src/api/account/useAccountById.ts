import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Account } from '@models';

import { ACCOUNTS_KEY } from './constants';

export const useAccountById = (id?: string): UseQueryResult<Account> => {
  const { accounts } = useApi();
  return useQuery([ACCOUNTS_KEY, id], () => accounts.getById(id as string), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
