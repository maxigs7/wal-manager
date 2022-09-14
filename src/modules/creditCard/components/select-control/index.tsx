import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { CreditCardSelect, ICreditCardSelectProps } from '../select';

export interface ICreditCardSelectControlProps
  extends Omit<ICreditCardSelectProps, 'onBlur' | 'onChange'> {
  control?: Control<any>;
  rules?: RegisterOptions;
}

const CreditCardSelectControl: React.FC<ICreditCardSelectControlProps> = ({
  creditCards = [],
  control,
  id,
  isLoading,
  name,
  placeholder,
  rules,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <CreditCardSelect
      {...props}
      {...field}
      creditCards={creditCards}
      id={id}
      isLoading={isLoading}
      placeholder={placeholder}
    />
  );
};

export { CreditCardSelectControl };
