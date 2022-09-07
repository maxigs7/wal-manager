import { HStack, Text } from '@chakra-ui/react';
import React, { useMemo, ReactElement } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Select as ReactSelect } from '@lib';
import { CreditCardType, getCreditCardTypeName } from '@models';

import { CreditCardTypeIcon } from '../type-icon';

interface IOption {
  icon: ReactElement;
  label: string;
  value: CreditCardType;
}

const Option: React.FC<IOption> = ({ icon, label }) => {
  return (
    <HStack>
      {icon}
      <Text>{label}</Text>
    </HStack>
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

const CreditCardTypeSelect: React.FC<IProps> = ({ control, id, name, placeholder, rules }) => {
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: null,
  });

  const options: IOption[] = useMemo(
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
      {...inputProps}
      formatOptionLabel={Option}
      getOptionValue={(option) => option.value}
      id={id}
      isSearchable={false}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      value={options.find((option) => option.value === value)}
    />
  );
};

export { CreditCardTypeSelect };
