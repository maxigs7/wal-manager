import React, { useCallback, useEffect } from 'react';

import { Account } from '@models';

import { AccountSelect, IAccountSelectProps } from '../../components';
import { useAccountList } from '../../hooks';

type Props = Omit<IAccountSelectProps, 'accounts' | 'isLoading' | 'onChange'> & {
  firstAsDefault?: boolean;
  onChange?(id?: string, account?: Account): void;
};

const AccountSelectContainer: React.FC<Props> = ({ firstAsDefault = true, onChange, ...props }) => {
  const { data: accounts, isLoading } = useAccountList();

  const onChangeHandler = useCallback(
    (id?: string) => {
      if (!id) {
        onChange && onChange(id);
        return;
      }
      const account = (accounts || []).find((a) => a.id === id);
      onChange && onChange(id, account);
    },
    [accounts, onChange],
  );

  useEffect(() => {
    if (accounts && accounts.length) {
      const defaultAccount = accounts.find((a) => a.isDefault)?.id;
      defaultAccount && onChangeHandler && onChangeHandler(defaultAccount);
      !defaultAccount && firstAsDefault && onChangeHandler && onChangeHandler(accounts[0].id);
    }
  }, [accounts, firstAsDefault, onChangeHandler]);

  return (
    <AccountSelect
      accounts={accounts}
      isLoading={isLoading}
      onChange={onChangeHandler}
      {...props}
    />
  );
};

export { AccountSelectContainer };
