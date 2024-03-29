import React from 'react';

import { FormLabel, Switch, SwitchProps } from '@chakra-ui/react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

interface IProps extends SwitchProps {
  control: Control<any>;
  defaultChecked?: boolean;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const SwitchControl: React.FC<IProps> = ({ children, control, id, name, rules, ...props }) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <>
      <FormLabel htmlFor={id}>{children}</FormLabel>
      <Switch {...props} {...field} id={id} isChecked={field.value} />
    </>
  );
};

export { SwitchControl };
