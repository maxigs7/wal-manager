import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from './constants';

export const useCreditCardById = (id?: string): UseQueryResult<CreditCard> => {
  const { creditCards } = useApi();
  return useQuery([CREDIT_CARDS_KEY, id], () => creditCards.getById(id as string), {
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
