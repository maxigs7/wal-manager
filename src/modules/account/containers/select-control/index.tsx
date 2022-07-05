import React from 'react';

import { AccountSelectControl, IAccountSelectControlProps } from '../../components';
import { useAccountList } from '../../hooks';

const SelectControl: React.FC<Omit<IAccountSelectControlProps, 'accounts' | 'isLoading'>> = (
  props,
) => {
  const { data: accounts, isLoading } = useAccountList();
  return <AccountSelectControl accounts={accounts} isLoading={isLoading} {...props} />;
};

export default SelectControl;
