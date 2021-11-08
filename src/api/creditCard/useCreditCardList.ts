import { useQuery, UseQueryResult } from 'react-query';

import { CreditCard } from '@models/credit-cards';

import { useApi } from '..';

export const useCreditCardList = (): UseQueryResult<CreditCard[]> => {
  const { creditCards } = useApi();
  return useQuery('creditCards', () => creditCards.getAll({ sort: { field: 'name' } }), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};
