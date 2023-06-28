'use client';

import React from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { CreditCardType } from '@/models';

import {
  CreditCardTypeSelect,
  CreditCardTypeSelectProps,
} from '../../form/credit-card-type-select';

export type CreditCardTypeSelectControlProps = Omit<
  CreditCardTypeSelectProps,
  'onBlur' | 'onChange'
> & {
  control?: Control<any>;
  defaultValue?: CreditCardType;
  rules?: RegisterOptions;
};

const CreditCardTypeSelectControl: React.FC<CreditCardTypeSelectControlProps> = ({
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

  return <CreditCardTypeSelect {...field} id={id} placeholder={placeholder} />;
};

export { CreditCardTypeSelectControl };
