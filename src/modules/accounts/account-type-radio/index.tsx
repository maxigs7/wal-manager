import React from 'react';

import { Radio, RadioGroup, RadioGroupProps, Stack } from '@chakra-ui/react';

import { getAccountTypeName } from '@/models';

const AccountTypeRadioGroup: React.FC<Omit<RadioGroupProps, 'children'>> = React.forwardRef<
  HTMLDivElement,
  Omit<RadioGroupProps, 'children'>
>((props, ref) => {
  return (
    <RadioGroup {...props} ref={ref}>
      <Stack direction="row">
        <Radio value="bank">{getAccountTypeName('bank')}</Radio>
        <Radio value="cash">{getAccountTypeName('cash')}</Radio>
      </Stack>
    </RadioGroup>
  );
});

AccountTypeRadioGroup.displayName = 'AccountTypeRadioGroup';

export { AccountTypeRadioGroup };
