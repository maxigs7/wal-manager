import { useQuery, UseQueryResult } from 'react-query';

import { Account } from '@models/accounts';

import { useApi } from '..';

export const useAccountList = (): UseQueryResult<Account[]> => {
  const { accounts } = useApi();
  return useQuery('accounts', () => accounts.getAll({ sort: { field: 'name' } }), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
