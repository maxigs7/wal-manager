import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { CreditCard } from '@models';

export const useCreditCardById = (id?: string): UseQueryResult<CreditCard> => {
  const { creditCards } = useApi();
  return useQuery(['creditCards', id], () => creditCards.getById(id as string), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};