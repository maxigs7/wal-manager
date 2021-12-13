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
  accounts,
  control,
  id,
  isLoading,
  name,
  placeholder,
  rules,
}) => {
  const {
    field: { onChange, ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue: null,
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
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      ref={ref}
      value={options?.find((option) => option.value === value)}
    />
  );
};

export default Select;
