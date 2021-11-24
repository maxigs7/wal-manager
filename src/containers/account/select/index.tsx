import React from 'react';

import { useAccountList } from '@api';
import { AccountSelect, IAccountSelectProps } from '@components';

const AccountSelectContainer: React.FC<Omit<IAccountSelectProps, 'accounts' | 'isLoading'>> = (
  props,
) => {
  const { data: accounts, isLoading } = useAccountList();
  return <AccountSelect accounts={accounts} isLoading={isLoading} {...props} />;
};

export { AccountSelectContainer };
