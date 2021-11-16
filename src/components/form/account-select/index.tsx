import React, { useMemo } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import Select from 'react-select';

import { HStack } from '@chakra-ui/layout';

import { AccountInline } from '@components';
import { Account, AccountType } from '@models';

const AccountOption: React.FC<{ label: string; type: AccountType; value: string }> = ({
  label,
  type,
}) => (
  <HStack align="center">
    <AccountInline name={label} type={type} />
  </HStack>
);

const AccountSelect: React.FC<IAccountSelectProps> = ({
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
    <Select
      {...inputProps}
      formatOptionLabel={AccountOption}
      getOptionValue={(option) => option.value}
      id={id}
      inputRef={ref}
      isLoading={isLoading}
      isSearchable={false}
      onChange={(selected) => onChange(selected?.value)}
      options={options}
      placeholder={placeholder}
      value={options?.find((option) => option.value === value)}
    />
  );
};

interface IAccountSelectProps {
  accounts?: Account[];
  control: Control<any>;
  defaultValue?: string;
  id?: string;
  isLoading: boolean;
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export { AccountSelect };
export type { IAccountSelectProps };
