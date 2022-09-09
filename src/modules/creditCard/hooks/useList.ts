import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from '../constants';

const useList = (): UseQueryResult<CreditCard[]> => {
  const { creditCards } = useSupabaseClient();
  return useQuery([CREDIT_CARDS_KEY], () => creditCards.getAll({ sort: { field: 'name' } }));
};

export default useList;
