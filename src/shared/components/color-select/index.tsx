import React from 'react';

import { HStack, Text } from '@chakra-ui/react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Select as ReactSelect } from '@/lib';
import { colorTransform } from '@/models';

import { ColorCircle } from '../color-circle';
import { colors } from './colors';

interface IProps {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const options = colors.map(({ key, name }) => ({ value: key, label: name }));

const ColorOption: React.FC<{ label: string; value: string }> = ({ value, label }) => {
  return (
    <HStack>
      <ColorCircle bg={colorTransform(value)} />
      <Text>{label}</Text>
    </HStack>
  );
};

const ColorSelect: React.FC<IProps> = ({ control, id, name, placeholder, rules }) => {
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: null,
  });

  return (
    <ReactSelect
      {...inputProps}
      formatOptionLabel={ColorOption}
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

export { ColorSelect };
