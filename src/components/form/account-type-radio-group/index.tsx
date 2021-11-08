import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

import { AccountType } from '@models/common';

const AccountTypeRadioGroup: React.FC<IProps> = ({
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
        <Radio value={AccountType.Bank}>Banco</Radio>
        <Radio value={AccountType.Wallet}>Efectivo</Radio>
      </Stack>
    </RadioGroup>
  );
};

interface IProps {
  control: Control<any>;
  defaultValue?: AccountType;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export { AccountTypeRadioGroup };
