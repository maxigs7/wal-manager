import React from 'react';

import { QuotationSelectControl, IQuotationSelectControlProps } from '../../components';
import { useQuotationSelectAll } from '../../hooks';

const QuotationSelectControlContainer: React.FC<
  Omit<IQuotationSelectControlProps, 'quotations' | 'isLoading'>
> = (props) => {
  const { data: quotations, isLoading } = useQuotationSelectAll();
  return <QuotationSelectControl isLoading={isLoading} quotations={quotations} {...props} />;
};

export { QuotationSelectControlContainer };
