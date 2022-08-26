import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

import { AccountType, getAccountTypeName } from '@models';

interface IProps {
  control: Control<any>;
  defaultValue?: AccountType;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const TypeRadioGroup: React.FC<IProps> = ({
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
    defaultValue: defaultValue,
  });

  return (
    <RadioGroup {...field} defaultValue={defaultValue} id={id} placeholder={placeholder}>
      <Stack direction="row">
        <Radio value="bank">{getAccountTypeName('bank')}</Radio>
        <Radio value="cash">{getAccountTypeName('cash')}</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default TypeRadioGroup;
