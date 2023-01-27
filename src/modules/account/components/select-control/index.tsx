import React, { useMemo } from 'react';

import { Control, Controller, RegisterOptions } from 'react-hook-form';

import { Account } from '@models';

import { AccountSelect, IAccountSelectProps } from '../select';

export interface IAccountSelectControlProps extends Omit<IAccountSelectProps, 'onBlur' | ''> {
  excludeId?: string[];
  control?: Control<any>;
  rules?: RegisterOptions;
  selectByDefault?: boolean;
}

const AccountSelectControl: React.FC<IAccountSelectControlProps> = ({
  accounts = [],
  control,
  excludeId = [],
  id,
  isLoading,
  name,
  onChange,
  placeholder,
  rules,
  selectByDefault = true,
  ...props
}) => {
  const def = useMemo(
    () => (selectByDefault ? accounts.find((account) => account.isPrimary) : undefined),
    [accounts, selectByDefault],
  );

  const filteredList = useMemo(
    () => accounts.filter((acc) => !excludeId.includes(acc.id)),
    [accounts, excludeId],
  );

  return (
    <Controller
      control={control}
      defaultValue={def?.id}
      name={name}
      rules={rules}
      render={({ field: { onChange: onChangeField, onBlur, ...field } }) => {
        const onChangeHandler = (selected?: Account) => {
          onChangeField(selected?.id);
          onChange && onChange(selected);
        };
        return (
          <AccountSelect
            {...props}
            {...field}
            accounts={filteredList}
            id={id}
            isLoading={isLoading}
            onChange={onChangeHandler}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
};

export { AccountSelectControl };
