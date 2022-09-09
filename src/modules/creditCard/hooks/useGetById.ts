import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from '../constants';

const useGetById = (id?: string): UseQueryResult<CreditCard> => {
  const { creditCards } = useSupabaseClient();
  return useQuery([CREDIT_CARDS_KEY, id], () => creditCards.getById(id as string), {
    enabled: !!id,
  });
};

export default useGetById;
