import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Account } from '@/models';
import { useUow } from '@/shared';

import { ACCOUNTS_KEY } from '../constants';

const useSelectAll = (initialData?: Account[]): UseQueryResult<Account[]> => {
  const { account } = useUow();

  return useQuery([ACCOUNTS_KEY], () => account.select({ order: { field: 'name' } }), {
    initialData,
  });
};

export default useSelectAll;
