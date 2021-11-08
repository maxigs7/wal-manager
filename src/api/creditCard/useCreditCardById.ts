import { useQuery, UseQueryResult } from 'react-query';

import { CreditCard } from '@models/credit-cards';

import { useApi } from '..';

export const useCreditCardById = (id?: string): UseQueryResult<CreditCard> => {
  const { creditCards } = useApi();
  return useQuery(['creditCards', id], () => creditCards.getById(id as string), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
