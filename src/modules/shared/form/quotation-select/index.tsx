'use client';

import React, { useMemo } from 'react';

import { SingleValue } from 'chakra-react-select';

import { Select as ReactSelect } from '@/lib/react-select';
import { Quotation, QuotationType } from '@/models';

import { SelectOption } from '../../models';

type Option = SelectOption<QuotationType> & Quotation;

export type QuotationSelectProps = {
  id?: string;
  isLoading?: boolean;
  isRequired?: boolean;
  name: string;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(value?: Quotation): void;
  placeholder?: string;
  quotations?: Quotation[];
  value?: string;
};

const QuotationSelect = React.forwardRef<any, QuotationSelectProps>(
  (
    { id, isLoading, isRequired, name, onBlur, onChange, placeholder, quotations = [], value },
    ref,
  ) => {
    const options: Option[] = useMemo(
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
        getOptionValue={(option: Option) => option.value}
        id={id}
        instanceId={id}
        isClearable={!isRequired}
        isLoading={isLoading}
        isSearchable={false}
        name={name}
        onBlur={onBlur}
        onChange={(selected: SingleValue<Option>) => onChange && onChange(selected || undefined)}
        options={options}
        placeholder={placeholder}
        ref={ref}
        value={options?.find((option) => option.value === value)}
      />
    );
  },
);

QuotationSelect.displayName = 'QuotationSelect';

export { QuotationSelect };
