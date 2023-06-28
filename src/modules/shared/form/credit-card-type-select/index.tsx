'use client';

import React, { ReactElement, useMemo } from 'react';

import { HStack, Text } from '@chakra-ui/react';

import { Select as ReactSelect } from '@/lib/react-select';
import { CreditCardType, getCreditCardTypeName } from '@/models';

import { CreditCardTypeIcon } from '../../credit-card-type-icon';
import { SelectOption } from '../../models';

export type CreditCardTypeSelectProps = {
  id?: string;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: CreditCardType): void;
  placeholder?: string;
  value?: CreditCardType;
};

type CreditCardTypeOption = SelectOption<CreditCardType> & {
  icon: ReactElement;
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
    const options: CreditCardTypeOption[] = useMemo(
      () => [
        {
          icon: <CreditCardTypeIcon height={30} type={'amex'} />,
          label: getCreditCardTypeName('amex'),
          value: 'amex',
        },
        {
          icon: <CreditCardTypeIcon height={30} type={'carrefour'} />,
          label: getCreditCardTypeName('carrefour'),
          value: 'carrefour',
        },
        {
          icon: <CreditCardTypeIcon height={30} type={'mastercard'} />,
          label: getCreditCardTypeName('mastercard'),
          value: 'mastercard',
        },
        {
          icon: <CreditCardTypeIcon height={30} type={'naranja'} />,
          label: getCreditCardTypeName('naranja'),
          value: 'naranja',
        },
        {
          icon: <CreditCardTypeIcon height={30} type={'visa'} />,
          label: getCreditCardTypeName('visa'),
          value: 'visa',
        },
      ],
      [],
    );

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
