import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { CreditCard } from '@models';

import { CREDIT_CARDS_KEY } from '../constants';

const useSelectCreditCardById = (id?: string): UseQueryResult<CreditCard> => {
  const { creditCard } = useUow();
  return useQuery([CREDIT_CARDS_KEY, id], () => creditCard.selectById(id as string), {
    enabled: !!id,
  });
};

export default useSelectCreditCardById;
