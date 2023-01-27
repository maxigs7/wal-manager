import React, { useMemo } from 'react';

import { Select as ReactSelect } from '@/lib';
import { getMovementTypeName, MovementType } from '@/models';

type SelectOption = {
  label: string;
  value: MovementType;
};

export interface IMovementTypeSelectProps {
  id?: string;
  includeInvestment?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(value?: string): void;
  placeholder?: string;
  value?: string;
}

const MovementTypeSelect = React.forwardRef<any, IMovementTypeSelectProps>(
  (
    { id, includeInvestment, isDisabled, isRequired, name, onBlur, onChange, placeholder, value },
    ref,
  ) => {
    const options: SelectOption[] = useMemo(
      () =>
        [
          {
            label: getMovementTypeName('expenses'),
            value: 'expenses',
          },
          {
            label: getMovementTypeName('incomes'),
            value: 'incomes',
          },
          includeInvestment
            ? {
                label: getMovementTypeName('investment'),
                value: 'investment',
              }
            : undefined,
          {
            label: getMovementTypeName('transfer'),
            value: 'transfer',
          },
        ].filter(Boolean) as SelectOption[],
      [includeInvestment],
    );

    return (
      <ReactSelect
        getOptionValue={(option) => option.value}
        id={id}
        isClearable={!isRequired}
        isDisabled={isDisabled}
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

MovementTypeSelect.displayName = 'MovementTypeSelect';

export { MovementTypeSelect };
