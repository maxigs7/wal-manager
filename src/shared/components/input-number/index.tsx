import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

interface IProps {
  control: Control<any>;
  defaultValue?: number;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const InputNumber: React.FC<IProps> = ({ control, defaultValue, id, name, rules }) => {
  const {
    field: { onChange, ...field },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleWithPrecision = (valueAsString: string, valueAsNumber: number) => {
    if (valueAsString === '' || valueAsString.includes('.')) return onChange(valueAsString);
    return onChange(valueAsNumber);
  };

  return (
    <NumberInput {...field} defaultValue={defaultValue} id={id} onChange={handleWithPrecision}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default InputNumber;
