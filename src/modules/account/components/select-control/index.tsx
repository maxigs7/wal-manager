import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { AccountSelect, IAccountSelectProps } from '../select';

export interface IAccountSelectControlProps
  extends Omit<IAccountSelectProps, 'onBlur' | 'onChange' | ''> {
  control?: Control<any>;
  rules?: RegisterOptions;
}

const AccountSelectControl: React.FC<IAccountSelectControlProps> = ({
  accounts = [],
  control,
  id,
  isLoading,
  name,
  placeholder,
  rules,
}) => {
  const def = accounts.find((account) => account.isDefault);
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: def?.id,
  });

  return (
    <AccountSelect
      {...field}
      accounts={accounts}
      id={id}
      isLoading={isLoading}
      placeholder={placeholder}
    />
  );
};

export { AccountSelectControl };
