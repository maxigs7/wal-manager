'use client';

import { useCallback } from 'react';

import { useSupabase } from '@/lib/supabase/provider';
import { Account } from '@/models';
import { select } from '@/supabase';

export type UseIsNameUniqueReturn = (name?: string, id?: string) => Promise<boolean>;

const useIsNameUnique: () => UseIsNameUniqueReturn = (): UseIsNameUniqueReturn => {
  const { supabase } = useSupabase();

  return useCallback(
    async (name?: string, id?: string): Promise<boolean> => {
      if (name === undefined) {
        return true;
      }

      const accounts: Account[] = await select<'account'>(
        supabase,
        'account',
      )({
        filter: (query) => {
          const nameFilter = query.eq('name', name);
          const idFilter = id ? nameFilter.neq('id', id) : nameFilter;
          return idFilter;
        },
      });

      return !accounts?.length;
    },
    [supabase],
  );
};

export default useIsNameUnique;
