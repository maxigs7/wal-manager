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
        icon: <TypeIcon height={30} type={'amex'} />,
        label: 'American Express',
        value: 'amex',
      },
      {
        icon: <TypeIcon height={30} type={'carrefour'} />,
        label: 'Carrefour',
        value: 'carrefour',
      },
      {
        icon: <TypeIcon height={30} type={'mastercard'} />,
        label: 'Mastercard',
        value: 'mastercard',
      },
      {
        icon: <TypeIcon height={30} type={'naranja'} />,
        label: 'Naranja',
        value: 'naranja',
      },
      {
        icon: <TypeIcon height={30} type={'visa'} />,
        label: 'VISA',
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

interface IProps {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export default Select;
