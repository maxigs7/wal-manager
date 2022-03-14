import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from '../constants';

const hook = (): UseQueryResult<CreditCard[]> => {
  const { creditCards } = useApi();
  return useQuery([CREDIT_CARDS_KEY], () => creditCards.getAll({ sort: { field: 'name' } }));
};

export default hook;
