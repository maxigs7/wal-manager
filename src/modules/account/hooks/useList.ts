import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseApi } from '@api';
import { Account } from '@models';

import { ACCOUNTS_KEY } from '../constants';

const useList = (q?: string): UseQueryResult<Account[]> => {
  const { accounts } = useSupabaseApi();
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
      select: (data: Account[]) =>
        data.filter(
          (account: Account) => !q || account.name.toLowerCase().includes(q.toLowerCase()),
        ),
    },
  );
};

export default useList;
