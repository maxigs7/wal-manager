import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Checkbox, CheckboxProps } from '@chakra-ui/react';

interface IProps extends CheckboxProps {
  control: Control<any>;
  defaultChecked?: boolean;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const InputCheckbox: React.FC<IProps> = ({
  children,
  control,
  defaultChecked,
  id,
  name,
  rules,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <Checkbox {...field} {...props} defaultChecked={defaultChecked} id={id}>
      {children}
    </Checkbox>
  );
};

export default InputCheckbox;
