import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Account } from '@models';

import { ACCOUNTS_KEY } from '../constants';

const hook = (q?: string): UseQueryResult<Account[]> => {
  const { accounts } = useApi();
  return useQuery(
    [ACCOUNTS_KEY],
    () =>
      accounts.getAll({
        filtering: (query) => {
          return query.is('archivedAt', null);
        },
        sort: { field: 'name' },
      }),
    {
      select: (data) =>
        data.filter((account) => !q || account.name.toLowerCase().includes(q.toLowerCase())),
    },
  );
};

export default hook;
