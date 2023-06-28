import { useCallback } from 'react';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabase } from '@/lib/supabase/provider';
import { CreditCard } from '@/models';
import { selectById } from '@/supabase';

import { CREDIT_CARDS_KEY } from '../constants';

type UseSelectById = (id?: string, initialData?: CreditCard) => UseQueryResult<CreditCard>;

const useSelectById: UseSelectById = (
  id?: string,
  initialData?: CreditCard,
): UseQueryResult<CreditCard> => {
  const { supabase } = useSupabase();
  const queryKey = [CREDIT_CARDS_KEY, id];
  const queryFn = useCallback(
    () => selectById<'creditCard'>(supabase, 'creditCard')(id as string),
    [supabase, id],
  );

  return useQuery<CreditCard, Error>(queryKey, queryFn, {
    enabled: !!id,
    initialData,
  });
};

export default useSelectById;
