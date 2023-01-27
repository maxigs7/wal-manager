import React from 'react';

import { SelectProps } from '@chakra-ui/react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { SelectForm } from '../../form';

interface IProps extends SelectProps {
  control: Control<any>;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const SelectControl: React.FC<IProps> = ({ children, control, id, name, rules, ...props }) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <SelectForm {...props} {...field} id={id} variant="flushed">
      {children}
    </SelectForm>
  );
};

export { SelectControl };
