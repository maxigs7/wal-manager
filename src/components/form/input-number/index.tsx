import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

const InputNumber: React.FC<IProps> = ({ control, id, name, rules }) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: 0,
  });

  return (
    <NumberInput {...field} id={id} type="numeric">
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

interface IProps {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export { InputNumber };
