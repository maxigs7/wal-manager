import React, { useCallback, useMemo } from 'react';

import { HStack } from '@chakra-ui/react';

import { Select as ReactSelect } from '@lib';
import { Account } from '@models';

import { AccountInline } from '../inline';

type SelectOption = Account & {
  label: string;
  value: string;
};

export interface IAccountSelectProps {
  accounts?: Account[];
  id?: string;
  isLoading: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: Account): void;
  placeholder?: string;
  value?: string;
}

const Option: React.FC<SelectOption> = ({ currency, label, type }) => (
  <HStack align="center">
    <AccountInline currency={currency} name={label} type={type} />
  </HStack>
);

const AccountSelect = React.forwardRef<any, IAccountSelectProps>(
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
        name={name}
        onBlur={onBlur}
        onChange={(selected) => onChange && onChange(selected || undefined)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        value={options?.find((option) => option.value === value)}
        variant="flushed"
      />
    );
  },
);

AccountSelect.displayName = 'AccountSelect';

export { AccountSelect };
