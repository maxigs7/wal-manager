import React from 'react';

import { AccountSelectControl, IAccountSelectControlProps } from '../../components';
import { useAccountSelectAll } from '../../hooks';

const AccountSelectControlContainer: React.FC<
  Omit<IAccountSelectControlProps, 'accounts' | 'isLoading'>
> = (props) => {
  const { data: accounts, isLoading } = useAccountSelectAll();
  return <AccountSelectControl accounts={accounts} isLoading={isLoading} {...props} />;
};

export { AccountSelectControlContainer };
