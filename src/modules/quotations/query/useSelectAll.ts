'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { Quotation } from '@/models';
import { select } from '@/supabase';

import { QUOTATIONS_KEY } from '../constants';

type UseSelectAll = () => UseQueryResult<Quotation[]>;

const useSelectAll: UseSelectAll = (): UseQueryResult<Quotation[]> => {
  const { supabase } = useSupabase();

  const fetchQuotations = () => {
    const queryOptions = { order: { field: 'name', ascending: true } };
    return select<'quotation'>(supabase, 'quotation')(queryOptions);
  };

  return useQuery([QUOTATIONS_KEY], fetchQuotations);
};

export default useSelectAll;
