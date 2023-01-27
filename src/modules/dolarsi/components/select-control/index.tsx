import React from 'react';

import { Control, RegisterOptions, useController } from 'react-hook-form';

import { QuotationType } from '@models';

import { SelectDolarsi, ISelectDolarsiProps } from '../select';

export interface ISelectControlProps extends Omit<ISelectDolarsiProps, 'onBlur' | 'onChange' | ''> {
  control?: Control<any>;
  defaultValue?: QuotationType;
  rules?: RegisterOptions;
}

const SelectDolarsiControl: React.FC<ISelectControlProps> = ({
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

  return (
    <SelectDolarsi {...field} id={id} isRequired={!!rules?.required} placeholder={placeholder} />
  );
};

export { SelectDolarsiControl };
