import React, { useMemo, ReactElement } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import ReactSelect from 'react-select';

import { HStack, Text } from '@chakra-ui/react';

import { CreditCardType } from '@entities';

import TypeIcon from '../type-icon';

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

const Select: React.FC<IProps> = ({ control, id, name, placeholder, rules }) => {
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
        icon: <TypeIcon height={30} type={CreditCardType.Amex} />,
        label: 'American Express',
        value: CreditCardType.Amex,
      },
      {
        icon: <TypeIcon height={30} type={CreditCardType.Carrefour} />,
        label: 'Carrefour',
        value: CreditCardType.Carrefour,
      },
      {
        icon: <TypeIcon height={30} type={CreditCardType.Mastercard} />,
        label: 'Mastercard',
        value: CreditCardType.Mastercard,
      },
      {
        icon: <TypeIcon height={30} type={CreditCardType.Naranja} />,
        label: 'Naranja',
        value: CreditCardType.Naranja,
      },
      {
        icon: <TypeIcon height={30} type={CreditCardType.Visa} />,
        label: 'VISA',
        value: CreditCardType.Visa,
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

interface IProps {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export default Select;
