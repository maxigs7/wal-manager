import { useQuery, useQueryClient, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from './constants';

export const useCreditCardList = (): UseQueryResult<CreditCard[]> => {
  const { creditCards } = useApi();
  return useQuery([CREDIT_CARDS_KEY], () => creditCards.getAll({ sort: { field: 'name' } }), {
    refetchOnWindowFocus: false,
  });
};

export const useCreditCardRefresh = (): ((id?: string) => void) => {
  const queryClient = useQueryClient();

  return (id?: string) => {
    queryClient.resetQueries([CREDIT_CARDS_KEY], { exact: true }, { cancelRefetch: true });
    id && queryClient.removeQueries([CREDIT_CARDS_KEY, id], { exact: true });
  };
};
