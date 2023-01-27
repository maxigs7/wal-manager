import { useQuery, UseQueryResult } from '@tanstack/react-query';


import { useUow } from '@/api';
import { CreditCard } from '@/models';

import { CREDIT_CARDS_KEY } from '../constants';

const useSelectAll = (): UseQueryResult<CreditCard[]> => {
  const { creditCard } = useUow();

  return useQuery([CREDIT_CARDS_KEY], () => creditCard.select({ order: { field: 'name' } }));
};

export default useSelectAll;
