import { useQuery, UseQueryResult } from 'react-query';

import { CreditCard, useApi } from '@entities';

import { CREDIT_CARDS_KEY } from '../../config/constants';

export default (id?: string): UseQueryResult<CreditCard> => {
  const { creditCards } = useApi();
  return useQuery([CREDIT_CARDS_KEY, id], () => creditCards.getById(id as string), {
    enabled: !!id,
  });
};
