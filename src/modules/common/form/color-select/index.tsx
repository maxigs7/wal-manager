import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import Select from 'react-select';

import { HStack, Text } from '@chakra-ui/react';

import { colors } from '@lib/chakra-ui';

import { ColorCircle } from '../..';

const options = colors.map(({ key, name }) => ({ value: key, label: name }));

const ColorOption: React.FC<{ label: string; value: string }> = ({ value, label }) => (
  <HStack>
    <ColorCircle bg={value} />
    <Text>{label}</Text>
  </HStack>
);

const ColorSelect: React.FC<IProps> = ({ control, defaultValue, id, name, placeholder, rules }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <Select
      {...inputProps}
      formatOptionLabel={ColorOption}
      id={id}
      inputRef={ref}
      isSearchable={false}
      options={options}
      placeholder={placeholder}
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

export { ColorSelect };
