import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import {
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputProps,
} from '@chakra-ui/react';

import Icon from '../icon';

interface IProps extends NumberInputProps {
  control: Control<any>;
  defaultValue?: number;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: Omit<Partial<RegisterOptions>, 'valueAsNumber'>;
}

const InputCurrency: React.FC<IProps> = ({
  control,
  defaultValue,
  id,
  name,
  placeholder,
  rules,
  ...inputProps
}) => {
  const {
    field: { onChange, ...field },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <NumberInput
      {...inputProps}
      {...field}
      as={InputGroup}
      defaultValue={defaultValue}
      id={id}
      onChange={(_valueAsString, valueAsNumber) => onChange(valueAsNumber)}
      precision={2}
      type="numeric"
    >
      <InputLeftElement
        children={<Icon icon="dollar-sign" />}
        color="gray.300"
        fontSize="1.2em"
        pointerEvents="none"
      />
      <NumberInputField paddingInlineEnd={10} paddingInlineStart={10} placeholder={placeholder} />
    </NumberInput>
  );
};

export default InputCurrency;
