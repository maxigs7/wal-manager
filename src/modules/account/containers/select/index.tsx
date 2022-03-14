import React from 'react';

import { AccountSelect, IAccountSelectProps } from '../../components';
import { useAccountList } from '../../hooks';

const Select: React.FC<Omit<IAccountSelectProps, 'accounts' | 'isLoading'>> = (props) => {
  const { data: accounts, isLoading } = useAccountList();
  return <AccountSelect accounts={accounts} isLoading={isLoading} {...props} />;
};

export default Select;
