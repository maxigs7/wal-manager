import React from 'react';

import { Control, Controller, RegisterOptions, useController } from 'react-hook-form';

import { CreditCard } from '@/models';

import { CreditCardSelect, ICreditCardSelectProps } from '../select';


export interface ICreditCardSelectControlProps extends Omit<ICreditCardSelectProps, 'onBlur'> {
  control?: Control<any>;
  rules?: RegisterOptions;
}

const CreditCardSelectControl: React.FC<ICreditCardSelectControlProps> = ({
  creditCards = [],
  control,
  id,
  isLoading,
  name,
  onChange,
  placeholder,
  rules,
  ...props
}) => {
  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      rules={rules}
      render={({ field: { onChange: onChangeField, onBlur, ...field } }) => {
        const onChangeHandler = (selected?: CreditCard) => {
          onChangeField(selected?.id);
          onChange && onChange(selected);
        };

        return (
          <CreditCardSelect
            {...props}
            {...field}
            creditCards={creditCards}
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

export { CreditCardSelectControl };
