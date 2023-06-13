'use client';

import React from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Currency } from '@/models';

import { CurrencySelect, CurrencySelectProps } from '../../form/currency-select';

export type CurrencySelectControlProps = Omit<CurrencySelectProps, 'onBlur' | 'onChange'> & {
  control?: Control<any>;
  defaultValue?: Currency;
  rules?: RegisterOptions;
};

const CurrencySelectControl: React.FC<CurrencySelectControlProps> = ({
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

  return <CurrencySelect {...field} id={id} placeholder={placeholder} />;
};

export { CurrencySelectControl };
