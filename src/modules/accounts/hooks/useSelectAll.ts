import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Account } from '@/models';
import { useUow } from '@/shared';

import { ACCOUNTS_KEY } from '../constants';

const useSelectAll = (): UseQueryResult<Account[]> => {
  const { account } = useUow();

  return useQuery([ACCOUNTS_KEY], () => account.select({ order: { field: 'name' } }));
};

export default useSelectAll;
