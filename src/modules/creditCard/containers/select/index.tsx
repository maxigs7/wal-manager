import React from 'react';

import { CreditCardSelect, ICreditCardSelectProps } from '../../components';
import { useCreditCardSelectAll } from '../../hooks';

const CreditCardSelectContainer: React.FC<
  Omit<ICreditCardSelectProps, 'creditCards' | 'isLoading'>
> = (props) => {
  const { data: creditCards, isLoading } = useCreditCardSelectAll();

  return <CreditCardSelect creditCards={creditCards} isLoading={isLoading} {...props} />;
};

export { CreditCardSelectContainer };
