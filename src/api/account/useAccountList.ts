import { useQuery, useQueryClient, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Account } from '@models';

import { ACCOUNTS_KEY } from './constants';

export const useAccountList = (): UseQueryResult<Account[]> => {
  const { accounts } = useApi();
  return useQuery([ACCOUNTS_KEY], () => accounts.getAll({ sort: { field: 'name' } }), {
    refetchOnWindowFocus: false,
  });
};

export const useAccountRefresh = (): ((id?: string) => void) => {
  const queryClient = useQueryClient();

  return (id?: string) => {
    queryClient.resetQueries([ACCOUNTS_KEY], { exact: true }, { cancelRefetch: true });
    id && queryClient.removeQueries([ACCOUNTS_KEY, id], { exact: true });
  };
};
