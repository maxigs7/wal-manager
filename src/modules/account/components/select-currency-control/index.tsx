import React from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Currency } from '@/models';

import { SelectCurrency, ISelectProps } from '../select-currency';


export interface ISelectControlProps extends Omit<ISelectProps, 'onBlur' | 'onChange' | ''> {
  control?: Control<any>;
  defaultValue?: Currency;
  rules?: RegisterOptions;
}

const SelectCurrencyControl: React.FC<ISelectControlProps> = ({
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

  return <SelectCurrency {...field} id={id} placeholder={placeholder} />;
};

export { SelectCurrencyControl };
