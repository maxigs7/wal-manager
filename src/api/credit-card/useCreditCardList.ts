import { useQuery, useQueryClient, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from './constants';

export const useCreditCardList = (): UseQueryResult<CreditCard[]> => {
  const { creditCards } = useApi();
  return useQuery(CREDIT_CARDS_KEY, () => creditCards.getAll({ sort: { field: 'name' } }), {
    refetchOnWindowFocus: false,
    enabled: false, // turned off by default, manual refetch is needed
  });
};

export const useCreditCardRefresh = (): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(CREDIT_CARDS_KEY, { exact: true, refetchInactive: true });
  };
};
