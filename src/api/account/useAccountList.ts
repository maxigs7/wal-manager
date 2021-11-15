import { useQuery, useQueryClient, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Account } from '@models';

import { ACCOUNTS_KEY } from './constants';

export const useAccountList = (): UseQueryResult<Account[]> => {
  const { accounts } = useApi();
  return useQuery(ACCOUNTS_KEY, () => accounts.getAll({ sort: { field: 'name' } }), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};

export const useAccountRefresh = (): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(ACCOUNTS_KEY, { exact: true, refetchInactive: true });
  };
};
