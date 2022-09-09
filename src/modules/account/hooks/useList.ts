import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { Account } from '@models';

import { ACCOUNTS_KEY } from '../constants';

const useList = (): UseQueryResult<Account[]> => {
  const { accounts } = useSupabaseClient();
  return useQuery([ACCOUNTS_KEY], () =>
    accounts.getAll({
      filtering: (query) => {
        return query.is('archivedAt', null);
      },
      sort: { field: 'name' },
    }),
  );
};

export default useList;
