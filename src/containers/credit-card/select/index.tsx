import React, { useEffect } from 'react';

import { useCreditCardList } from '@api';
import { CreditCardSelect, ICreditCardSelectProps } from '@components';

const CreditCardSelectContainer: React.FC<Omit<ICreditCardSelectProps, 'ccs' | 'isLoading'>> = (
  props,
) => {
  const { data: ccs, isLoading, refetch } = useCreditCardList();

  useEffect(() => {
    refetch();
  }, []);

  return <CreditCardSelect ccs={ccs} isLoading={isLoading} {...props} />;
};

export { CreditCardSelectContainer };