import { useCallback } from 'react';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { Account } from '@/models';
import { selectById } from '@/supabase';

import { ACCOUNTS_KEY } from '../constants';

type UseSelectById = (id?: string, initialData?: Account) => UseQueryResult<Account>;

const useSelectById: UseSelectById = (
  id?: string,
  initialData?: Account,
): UseQueryResult<Account> => {
  const { supabase } = useSupabase();
  const queryKey = [ACCOUNTS_KEY, id];
  const queryFn = useCallback(
    () => selectById<'account'>(supabase, 'account')(id as string),
    [supabase, id],
  );

  return useQuery<Account, Error>(queryKey, queryFn, {
    enabled: !!id,
    initialData,
  });
};

export default useSelectById;
