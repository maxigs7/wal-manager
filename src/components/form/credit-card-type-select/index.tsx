import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import Select from 'react-select';

import { HStack, Text } from '@chakra-ui/react';

import { creditCardTypes, ICreditCardTypeOption } from './types';

const CreditCardTypeOption: React.FC<ICreditCardTypeOption> = ({ icon, label }) => {
  return (
    <HStack>
      {icon}
      <Text>{label}</Text>
    </HStack>
  );
};

const CreditCardTypeSelect: React.FC<IProps> = ({ control, id, name, placeholder, rules }) => {
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: null,
  });

  return (
    <Select
      {...inputProps}
      formatOptionLabel={CreditCardTypeOption}
      getOptionValue={(option) => option.value}
      id={id}
      inputRef={ref}
      isSearchable={false}
      menuPortalTarget={document.body}
      onChange={(selected) => onChange(selected?.value)}
      options={creditCardTypes}
      placeholder={placeholder}
      value={creditCardTypes.find((option) => option.value === value)}
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

export { CreditCardTypeSelect };
