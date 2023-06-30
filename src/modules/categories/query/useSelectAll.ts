'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { Category } from '@/models';
import { select } from '@/supabase';

import { CATEGORIES_KEY } from '../constants';

type UseSelectAll = (initialData?: Category[]) => UseQueryResult<Category[]>;

const useSelectAll: UseSelectAll = (initialData?: Category[]): UseQueryResult<Category[]> => {
  const { supabase } = useSupabase();

  const fetchCategories = () => {
    const queryOptions = { order: { field: 'name' } };
    return select<'category'>(supabase, 'category')(queryOptions);
  };

  return useQuery([CATEGORIES_KEY], fetchCategories, { initialData });
};

export default useSelectAll;
