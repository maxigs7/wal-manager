'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { Account } from '@/models';
import { select } from '@/supabase';

import { ACCOUNTS_KEY } from '../constants';

type UseSelectAll = (initialData?: Account[]) => UseQueryResult<Account[]>;

const useSelectAll: UseSelectAll = (initialData?: Account[]): UseQueryResult<Account[]> => {
  const { supabase } = useSupabase();

  const fetchAccounts = () => {
    const queryOptions = { order: { field: 'name' } };
    return select<'account'>(supabase, 'account')(queryOptions);
  };

  return useQuery([ACCOUNTS_KEY], fetchAccounts, { initialData });
};

export default useSelectAll;
