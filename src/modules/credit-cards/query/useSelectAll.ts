'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { CreditCard } from '@/models';
import { select } from '@/supabase';

import { CREDIT_CARDS_KEY } from '../constants';

type UseSelectAll = (initialData?: CreditCard[]) => UseQueryResult<CreditCard[]>;

const useSelectAll: UseSelectAll = (initialData?: CreditCard[]): UseQueryResult<CreditCard[]> => {
  const { supabase } = useSupabase();

  const fetchCreditCards = () => {
    const queryOptions = { order: { field: 'name' } };
    return select<'creditCard'>(supabase, 'creditCard')(queryOptions);
  };

  return useQuery([CREDIT_CARDS_KEY], fetchCreditCards, { initialData });
};

export default useSelectAll;
