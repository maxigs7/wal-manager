import React, { useEffect } from 'react';

import { AccountSelect, IAccountSelectProps } from '../../components';
import { useAccountList } from '../../hooks';

const Select: React.FC<Omit<IAccountSelectProps, 'accounts' | 'isLoading'>> = ({
  onChange,
  ...props
}) => {
  const { data: accounts, isLoading } = useAccountList();

  useEffect(() => {
    if (accounts && accounts.length) {
      const defaultAccount = accounts.find((a) => a.isDefault)?.id;
      defaultAccount && onChange && onChange(defaultAccount);
    }
  }, [accounts, onChange]);

  return <AccountSelect accounts={accounts} isLoading={isLoading} onChange={onChange} {...props} />;
};

export default Select;
