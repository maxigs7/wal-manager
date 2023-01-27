import React, { useMemo } from 'react';

import { DolarsiList, DolarsiName } from '@/api';
import { Select as ReactSelect } from '@/lib';
import { QuotationType } from '@/models';

type SelectOption = {
  label: DolarsiName;
  value: QuotationType;
};

export interface ISelectDolarsiProps {
  id?: string;
  isRequired?: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(value?: string): void;
  placeholder?: string;
  value?: string;
}

const SelectDolarsi = React.forwardRef<any, ISelectDolarsiProps>(
  ({ id, isRequired, name, onBlur, onChange, placeholder, value }, ref) => {
    const options: SelectOption[] = useMemo(
      () =>
        Array.from(DolarsiList).map(([key, value]) => ({
          label: key,
          value: value,
        })),
      [],
    );

    return (
      <ReactSelect
        getOptionValue={(option) => option.value}
        id={id}
        isClearable={!isRequired}
        isSearchable={false}
        name={name}
        onBlur={onBlur}
        onChange={(selected) => onChange && onChange(selected?.value)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        value={options?.find((option) => option.value === value)}
        variant="flushed"
      />
    );
  },
);

SelectDolarsi.displayName = 'SelectDolarsi';

export { SelectDolarsi };
