import React, { useMemo, ReactElement } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { HStack, Text } from '@chakra-ui/react';
import { Select as ReactSelect } from 'chakra-react-select';

import { CreditCardType, getCreditCardTypeName } from '@models';

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
        label: getCreditCardTypeName('amex'),
        value: 'amex',
      },
      {
        icon: <TypeIcon height={30} type={'carrefour'} />,
        label: getCreditCardTypeName('carrefour'),
        value: 'carrefour',
      },
      {
        icon: <TypeIcon height={30} type={'mastercard'} />,
        label: getCreditCardTypeName('mastercard'),
        value: 'mastercard',
      },
      {
        icon: <TypeIcon height={30} type={'naranja'} />,
        label: getCreditCardTypeName('naranja'),
        value: 'naranja',
      },
      {
        icon: <TypeIcon height={30} type={'visa'} />,
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
      selectedOptionColor="accent"
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
