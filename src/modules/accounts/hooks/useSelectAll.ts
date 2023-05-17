import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { Account } from '@/models';
import { select } from '@/supabase';

import { ACCOUNTS_KEY } from '../constants';

const useSelectAll = (initialData?: Account[]): UseQueryResult<Account[]> => {
  const { supabase } = useSupabase();

  return useQuery(
    [ACCOUNTS_KEY],
    () => select<'account'>(supabase, 'account')({ order: { field: 'name' } }),
    {
      initialData,
    },
  );
};

export default useSelectAll;
