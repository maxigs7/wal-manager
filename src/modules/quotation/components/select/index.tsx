import React, { useMemo } from 'react';

import { Select as ReactSelect } from '@lib';
import { Quotation, QuotationType } from '@models';

type SelectOption = {
  label: string;
  value: QuotationType;
} & Quotation;

export interface IQuotationSelectProps {
  id?: string;
  isLoading: boolean;
  isRequired?: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(value?: Quotation): void;
  placeholder?: string;
  quotations?: Quotation[];
  value?: string;
}

const QuotationSelect = React.forwardRef<any, IQuotationSelectProps>(
  (
    { id, isLoading, isRequired, name, onBlur, onChange, placeholder, quotations = [], value },
    ref,
  ) => {
    const options: SelectOption[] = useMemo(
      () =>
        quotations?.map((quotation) => ({
          ...quotation,
          label: quotation.name,
          value: quotation.id,
        })),
      [quotations],
    );

    return (
      <ReactSelect
        getOptionValue={(option) => option.value}
        id={id}
        isClearable={!isRequired}
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

QuotationSelect.displayName = 'QuotationSelect';

export { QuotationSelect };
