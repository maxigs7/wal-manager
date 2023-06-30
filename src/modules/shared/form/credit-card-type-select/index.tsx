'use client';

import React, { useMemo } from 'react';

import { HStack, Text } from '@chakra-ui/react';

import { Select as ReactSelect } from '@/lib/react-select';
import { CreditCardType } from '@/models';

import { CREDIT_CARD_TYPE_OPTIONS, CreditCardTypeOption } from './types';

export type CreditCardTypeSelectProps = {
  id?: string;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: CreditCardType): void;
  placeholder?: string;
  value?: CreditCardType;
};

const Option: React.FC<CreditCardTypeOption> = ({ icon, label }) => {
  return (
    <HStack>
      {icon}
      <Text>{label}</Text>
    </HStack>
  );
};

const CreditCardTypeSelect = React.forwardRef<any, CreditCardTypeSelectProps>(
  ({ id, name, onBlur, onChange, placeholder, value }, ref) => {
    const options = useMemo(() => CREDIT_CARD_TYPE_OPTIONS, []);

    return (
      <ReactSelect
        formatOptionLabel={Option}
        getOptionValue={(option) => option.value}
        id={id}
        instanceId={id}
        isSearchable={false}
        name={name}
        onBlur={onBlur}
        onChange={(selected) => onChange && onChange(selected?.value || undefined)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        value={options?.find((option) => option.value === value)}
      />
    );
  },
);

CreditCardTypeSelect.displayName = 'CreditCardTypeSelect';

export { CreditCardTypeSelect };
