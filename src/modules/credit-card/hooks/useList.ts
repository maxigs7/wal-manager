import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from '../constants';

const hook = (q?: string): UseQueryResult<CreditCard[]> => {
  const { creditCards } = useApi();
  return useQuery([CREDIT_CARDS_KEY], () => creditCards.getAll({ sort: { field: 'name' } }), {
    select: (data) =>
      data.filter((account) => !q || account.name.toLowerCase().includes(q.toLowerCase())),
  });
};

export default hook;
