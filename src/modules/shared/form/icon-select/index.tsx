'use client';

import React, { useMemo } from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';

import { Select as ReactSelect } from '@/lib/react-select';

import { ICON_OPTIONS, IconOption } from './icons';

export type IconSelectProps = {
  id?: string;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: string): void;
  placeholder?: string;
  value?: string;
};

const Option: React.FC<IconOption> = ({ label, icon }) => (
  <HStack>
    <Icon as={icon} boxSize="4" />
    <Text>{label}</Text>
  </HStack>
);

const IconSelect = React.forwardRef<any, IconSelectProps>(
  ({ id, name, onBlur, onChange, placeholder, value }, ref) => {
    const options = useMemo(() => ICON_OPTIONS.sort((a, b) => a.label.localeCompare(b.label)), []);

    return (
      <ReactSelect
        formatOptionLabel={Option}
        getOptionValue={(option) => option.value}
        id={id}
        instanceId={id}
        isSearchable={true}
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

IconSelect.displayName = 'IconSelect';

export { IconSelect };
