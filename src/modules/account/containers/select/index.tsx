import React, { useEffect } from 'react';

import { AccountSelect, IAccountSelectProps } from '../../components';
import { useAccountList } from '../../hooks';

type Props = Omit<IAccountSelectProps, 'accounts' | 'isLoading'> & {
  firstAsDefault?: boolean;
};

const Select: React.FC<Props> = ({ firstAsDefault = true, onChange, ...props }) => {
  const { data: accounts, isLoading } = useAccountList();

  useEffect(() => {
    if (accounts && accounts.length) {
      const defaultAccount = accounts.find((a) => a.isDefault)?.id;
      defaultAccount && onChange && onChange(defaultAccount);
      !defaultAccount && firstAsDefault && onChange && onChange(accounts[0].id);
    }
  }, [accounts, onChange]);

  return <AccountSelect accounts={accounts} isLoading={isLoading} onChange={onChange} {...props} />;
};

export default Select;
