import React, { useMemo } from 'react';

import { Currency, getCurrencyName } from '@/models';
import { SelectForm } from '@/shared';

type SelectOption = {
  label: string;
  value: Currency;
};

export interface ISelectProps {
  id?: string;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLSelectElement>): void;
  onChange?(value?: Currency): void;
  placeholder?: string;
  value?: string;
}

const SelectCurrency = React.forwardRef<any, ISelectProps>(
  ({ id, name, onBlur, onChange, placeholder, value }, ref) => {
    const options: SelectOption[] = useMemo(
      () => [
        {
          label: getCurrencyName('ars'),
          value: 'ars',
        },
        {
          label: getCurrencyName('usd'),
          value: 'usd',
        },
      ],
      [],
    );

    return (
      <SelectForm
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={(e) => onChange && onChange(e.target.value as Currency)}
        placeholder={placeholder}
        ref={ref}
        value={value}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </SelectForm>
    );
  },
);

SelectCurrency.displayName = 'SelectCurrency';

export { SelectCurrency };
