import React from 'react';

import { CreditCardSelectControl, ICreditCardSelectControlProps } from '../../components';
import { useCreditCardSelectAll } from '../../hooks';

const CreditCardSelectControlContainer: React.FC<
  Omit<ICreditCardSelectControlProps, 'creditCards' | 'isLoading'>
> = (props) => {
  const { data: creditCards, isLoading } = useCreditCardSelectAll();
  return <CreditCardSelectControl creditCards={creditCards} isLoading={isLoading} {...props} />;
};

export { CreditCardSelectControlContainer };
