import { useQuery, UseQueryResult } from 'react-query';

import { Account, useApi } from '@entities';

import { ACCOUNTS_KEY } from '../../config/constants';

const hook = (): UseQueryResult<Account[]> => {
  const { accounts } = useApi();
  return useQuery([ACCOUNTS_KEY], () => accounts.getAll({ sort: { field: 'name' } }));
};

export default hook;
