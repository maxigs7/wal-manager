import React from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { MovementType } from '@/models';

import { MovementTypeSelect, IMovementTypeSelectProps } from '../type-select';


export interface IMovementTypeSelectControlProps
  extends Omit<IMovementTypeSelectProps, 'onBlur' | 'onChange' | ''> {
  control?: Control<any>;
  defaultValue?: MovementType;
  rules?: RegisterOptions;
}

const MovementTypeSelectControl: React.FC<IMovementTypeSelectControlProps> = ({
  control,
  defaultValue,
  id,
  includeInvestment,
  isDisabled,
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

  return (
    <MovementTypeSelect
      {...field}
      id={id}
      includeInvestment={includeInvestment}
      isDisabled={isDisabled}
      isRequired={!!rules?.required}
      placeholder={placeholder}
    />
  );
};

export { MovementTypeSelectControl };
