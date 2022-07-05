import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import Select, { ISelectProps } from '../select';

export interface ISelectControlProps extends Omit<ISelectProps, 'onBlur' | 'onChange' | ''> {
  control?: Control<any>;
  rules?: RegisterOptions;
}

const SelectControl: React.FC<ISelectControlProps> = ({
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
    <Select
      {...field}
      accounts={accounts}
      id={id}
      isLoading={isLoading}
      placeholder={placeholder}
    />
  );
};

export default SelectControl;
