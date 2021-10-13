import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Radio, RadioGroup, Stack, useMergeRefs } from '@chakra-ui/react';

import { AccountType } from '@app/models/common';

const AccountTypeRadioGroup: React.FC<IProps> = React.forwardRef(
  ({ control, defaultValue, id, name, placeholder, rules }, ref) => {
    const { field } = useController({
      name,
      control,
      rules,
      defaultValue: defaultValue,
    });
    const refs = useMergeRefs(field.ref, ref);

    return (
      <RadioGroup
        {...field}
        defaultValue={defaultValue}
        id={id}
        placeholder={placeholder}
        ref={refs}
      >
        <Stack direction="row">
          <Radio value={AccountType.Bank}>Banco</Radio>
          <Radio value={AccountType.Wallet}>Efectivo</Radio>
        </Stack>
      </RadioGroup>
    );
  },
);

interface IProps {
  control: Control<any>;
  defaultValue?: AccountType;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export { AccountTypeRadioGroup };
