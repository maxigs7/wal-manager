import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import ReactSelect from 'react-select';

import { HStack } from '@chakra-ui/react';

import { Account, AccountType } from '@entities';

import AccountInline from '../inline';

export interface ISelectProps {
  accounts?: Account[];
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  isLoading: boolean;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

const Option: React.FC<{ label: string; type: AccountType; value: string }> = ({ label, type }) => (
  <HStack align="center">
    <AccountInline name={label} type={type} />
  </HStack>
);

const Select: React.FC<ISelectProps> = ({
  accounts = [],
  control,
  id,
  isLoading,
  name,
  placeholder,
  rules,
}) => {
  const def = accounts.find((account) => account.isDefault);
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: def?.id,
  });

  const options = useMemo(
    () =>
      accounts?.map((acc) => ({
        label: acc.name,
        type: acc.type,
        value: acc.id,
      })),
    [accounts],
  );

  return (
    <ReactSelect
      {...inputProps}
      formatOptionLabel={Option}
      getOptionValue={(option) => option.value}
      id={id}
      isLoading={isLoading}
      isSearchable={false}
      menuPlacement="auto"
      menuPortalTarget={document.body}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      value={options?.find((option) => option.value === value)}
    />
  );
};

export default Select;
