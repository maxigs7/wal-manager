'use client';

import { useCallback } from 'react';

import { useSupabase } from '@/lib/supabase/provider';
import { Category } from '@/models';
import { select } from '@/supabase';

export type UseIsNameUniqueReturn = (
  name?: string,
  id?: string,
  parentId?: string,
) => Promise<boolean>;

const useIsNameUnique: () => UseIsNameUniqueReturn = (): UseIsNameUniqueReturn => {
  const { supabase } = useSupabase();

  return useCallback(
    async (name?: string, id?: string, parentId?: string): Promise<boolean> => {
      if (name === undefined) {
        return true;
      }

      const categories: Category[] = await select<'category'>(
        supabase,
        'category',
      )({
        filter: (query) => {
          let filtered = query.eq('name', name);
          if (parentId) {
            filtered = filtered.eq('parentId', parentId);
          } else {
            filtered = filtered.is('parentId', null);
          }
          if (id) {
            filtered.neq('id', id);
          }
          return filtered;
        },
      });

      return !categories?.length;
    },
    [supabase],
  );
};

export default useIsNameUnique;
