import React, { useEffect } from 'react';

import { AccountSelect, IAccountSelectProps } from '../../components';
import { useAccountSelectAll } from '../../hooks';

type Props = Omit<IAccountSelectProps, 'accounts' | 'isLoading'> & {
  firstAsDefault?: boolean;
};

const AccountSelectContainer: React.FC<Props> = ({ firstAsDefault = true, onChange, ...props }) => {
  const { data: accounts, isLoading } = useAccountSelectAll();

  useEffect(() => {
    if (accounts && accounts.length) {
      const defaultAccount = accounts.find((a) => a.isPrimary);
      defaultAccount && onChange && onChange(defaultAccount);
      !defaultAccount && firstAsDefault && onChange && onChange(accounts[0]);
    }
  }, [accounts, firstAsDefault, onChange]);

  return <AccountSelect accounts={accounts} isLoading={isLoading} onChange={onChange} {...props} />;
};

export { AccountSelectContainer };
