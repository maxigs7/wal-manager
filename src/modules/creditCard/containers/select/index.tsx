import React from 'react';

import { CreditCardSelect, ICreditCardSelectProps } from '../../components';
import { useCreditCardList } from '../../hooks';

const CreditCardSelectContainer: React.FC<
  Omit<ICreditCardSelectProps, 'creditCards' | 'isLoading'>
> = (props) => {
  const { data: creditCards, isLoading } = useCreditCardList();

  return <CreditCardSelect creditCards={creditCards} isLoading={isLoading} {...props} />;
};

export { CreditCardSelectContainer };
