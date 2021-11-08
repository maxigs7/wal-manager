import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Account } from '@models';

export const useAccountList = (): UseQueryResult<Account[]> => {
  const { accounts } = useApi();
  return useQuery('accounts', () => accounts.getAll({ sort: { field: 'name' } }), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
