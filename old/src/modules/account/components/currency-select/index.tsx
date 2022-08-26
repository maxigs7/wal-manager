import React, { useMemo } from 'react';

import { Select as ReactSelect } from '@lib';
import { Currency, getCurrencyName } from '@models';

type SelectOption = {
  label: string;
  value: Currency;
};

export interface ISelectProps {
  id?: string;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(value?: string): void;
  placeholder?: string;
  value?: string;
}

const Select = React.forwardRef<any, ISelectProps>(
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
      <ReactSelect
        getOptionValue={(option) => option.value}
        id={id}
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
