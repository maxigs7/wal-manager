import { useCallback } from 'react';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { Category } from '@/models';
import { selectById } from '@/supabase';

import { CATEGORIES_KEY } from '../constants';

type UseSelectById = (id?: string, initialData?: Category) => UseQueryResult<Category>;

const useSelectById: UseSelectById = (
  id?: string,
  initialData?: Category,
): UseQueryResult<Category> => {
  const { supabase } = useSupabase();
  const queryKey = [CATEGORIES_KEY, id];
  const queryFn = useCallback(
    () => selectById<'category'>(supabase, 'category')(id as string),
    [supabase, id],
  );

  return useQuery<Category, Error>(queryKey, queryFn, {
    enabled: !!id,
    initialData,
  });
};

export default useSelectById;
