import React, { useMemo } from 'react';

import { HStack } from '@chakra-ui/react';

import { Select as ReactSelect } from '@lib';
import { Account } from '@models';

import AccountInline from '../inline';

type SelectOption = Account & {
  label: string;
  value: string;
};

export interface ISelectProps {
  accounts?: Account[];
  id?: string;
  isLoading: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(value?: string): void;
  placeholder?: string;
  value?: string;
}

const Option: React.FC<SelectOption> = ({ currency, label, type }) => (
  <HStack align="center">
    <AccountInline currency={currency} name={label} type={type} />
  </HStack>
);

const Select = React.forwardRef<any, ISelectProps>(
  ({ accounts = [], id, isLoading, name, onBlur, onChange, placeholder, value }, ref) => {
    const options: SelectOption[] = useMemo(
      () =>
        accounts?.map((acc) => ({
          ...acc,
          label: acc.name,
          value: acc.id,
        })),
      [accounts],
    );

    return (
      <ReactSelect
        formatOptionLabel={Option}
        getOptionValue={(option) => option.value}
        id={id}
        isLoading={isLoading}
        isSearchable={false}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        name={name}
        onBlur={onBlur}
        onChange={(selected) => onChange && onChange(selected?.value)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={options?.find((option) => option.value === value)}
      />
    );
  },
);

export default Select;
