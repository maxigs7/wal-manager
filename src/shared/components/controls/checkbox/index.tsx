import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react';
import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

interface IProps extends CheckboxProps {
  control: Control<any>;
  defaultChecked?: boolean;
  id?: string;
  name: string;
  rules?: RegisterOptions;
}

const Checkbox: React.FC<IProps> = ({
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
    <ChakraCheckbox
      {...field}
      {...props}
      defaultChecked={defaultChecked}
      id={id}
      isChecked={field.value}
    >
      {children}
    </ChakraCheckbox>
  );
};

export { Checkbox };
