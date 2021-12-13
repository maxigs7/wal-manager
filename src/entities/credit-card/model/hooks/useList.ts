import { useQuery, UseQueryResult } from 'react-query';

import { CreditCard, useApi } from '@entities';

import { CREDIT_CARDS_KEY } from '../../config/constants';

export default (): UseQueryResult<CreditCard[]> => {
  const { creditCards } = useApi();
  return useQuery([CREDIT_CARDS_KEY], () => creditCards.getAll({ sort: { field: 'name' } }));
};
