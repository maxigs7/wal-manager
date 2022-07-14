import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Currency } from '@models';

import Select, { ISelectProps } from '../currency-select';

export interface ISelectControlProps extends Omit<ISelectProps, 'onBlur' | 'onChange' | ''> {
  control?: Control<any>;
  defaultValue?: Currency;
  rules?: RegisterOptions;
}

const SelectControl: React.FC<ISelectControlProps> = ({
  control,
  defaultValue,
  id,
  name,
  placeholder,
  rules,
}) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return <Select {...field} id={id} placeholder={placeholder} />;
};

export default SelectControl;
