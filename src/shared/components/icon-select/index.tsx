import React from 'react';

import { HStack, Text } from '@chakra-ui/react';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Control, RegisterOptions, useController } from 'react-hook-form';


import { Select as ReactSelect } from '@/lib';
import { CategoryIconsName } from '@/lib/font-awesome';

import { Icon } from '../icon';

interface IProps {
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const options = CategoryIconsName.map((icon) => ({ value: icon, label: icon }));

const IconOption: React.FC<{ label: string; value: IconName }> = ({ value, label }) => (
  <HStack>
    <Icon icon={value} fixedWidth />
    <Text>{label}</Text>
  </HStack>
);

const IconSelect: React.FC<IProps> = ({ control, defaultValue, id, name, placeholder, rules }) => {
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <ReactSelect
      {...inputProps}
      formatOptionLabel={IconOption}
      getOptionValue={(option) => option.value}
      id={id}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      value={options.find((option) => option.value === value)}
    />
  );
};

export { IconSelect };
