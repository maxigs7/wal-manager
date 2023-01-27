import React from 'react';

import { QuotationSelect, IQuotationSelectProps } from '../../components';
import { useQuotationSelectAll } from '../../hooks';

interface IProps extends Omit<IQuotationSelectProps, 'quotations' | 'isLoading'> {}

const QuotationSelectContainer: React.FC<IProps> = (props) => {
  const { data: quotations, isLoading } = useQuotationSelectAll();

  return <QuotationSelect isLoading={isLoading} quotations={quotations} {...props} />;
};

export { QuotationSelectContainer };
