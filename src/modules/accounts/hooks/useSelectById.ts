import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Account } from '@/models';
import { useUow } from '@/shared';

import { ACCOUNTS_KEY } from '../constants';

const useSelectAccountById = (id?: string): UseQueryResult<Account> => {
  const { account } = useUow();
  return useQuery([ACCOUNTS_KEY, id], () => account.selectById(id as string), {
    enabled: !!id,
  });
};

export default useSelectAccountById;
