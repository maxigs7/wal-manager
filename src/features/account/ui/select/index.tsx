import React from 'react';

import { AccountSelect, IAccountSelectProps, useAccountList } from '@entities';

const Select: React.FC<Omit<IAccountSelectProps, 'accounts' | 'isLoading'>> = (props) => {
  const { data: accounts, isLoading } = useAccountList();
  return <AccountSelect accounts={accounts} isLoading={isLoading} {...props} />;
};

export default Select;
