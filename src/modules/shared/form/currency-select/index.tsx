'use client';

import React, { useMemo } from 'react';

import { Select as ReactSelect } from '@/lib/react-select';
import { Currency } from '@/models';

import { CURRENCY_OPTIONS } from './currencies';

export type CurrencySelectProps = {
  id?: string;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(selected?: Currency): void;
  placeholder?: string;
  value?: Currency;
};

const CurrencySelect = React.forwardRef<any, CurrencySelectProps>(
  ({ id, name, onBlur, onChange, placeholder, value }, ref) => {
    const options = useMemo(() => CURRENCY_OPTIONS, []);

    return (
      <ReactSelect
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

CurrencySelect.displayName = 'CurrencySelect';

export { CurrencySelect };
