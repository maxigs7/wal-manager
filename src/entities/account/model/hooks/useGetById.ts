import { useQuery, UseQueryResult } from 'react-query';

import { Account, useApi } from '@entities';

import { ACCOUNTS_KEY } from '../../config/constants';

export default (id?: string): UseQueryResult<Account> => {
  const { accounts } = useApi();
  return useQuery([ACCOUNTS_KEY, id], () => accounts.getById(id as string), {
    enabled: !!id,
  });
};
