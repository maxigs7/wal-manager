import React, { useMemo } from 'react';

import { HStack, Text } from '@chakra-ui/react';

import { Select as ReactSelect } from '@/lib/react-select';
import { colorTransform } from '@/models';

import { ColorCircle } from '../../color-circle';
import { SelectOption } from '../../models';
import { COLOR_OPTIONS } from './colors';

export type ColorSelectProps = {
  id?: string;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: string): void;
  placeholder?: string;
  value?: string;
};

const Option: React.FC<SelectOption> = ({ value, label }) => {
  return (
    <HStack>
      <ColorCircle bg={colorTransform(value)} />
      <Text>{label}</Text>
    </HStack>
  );
};

const ColorSelect = React.forwardRef<any, ColorSelectProps>(
  ({ id, name, onBlur, onChange, placeholder, value }, ref) => {
    const options = useMemo(() => COLOR_OPTIONS, []);

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

ColorSelect.displayName = 'ColorSelect';

export { ColorSelect };
