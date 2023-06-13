'use client';

import React from 'react';

import { Control, Controller, RegisterOptions } from 'react-hook-form';

import { Quotation } from '@/models';

import { QuotationSelect, QuotationSelectProps } from '../../form/quotation-select';

export type QuotationSelectControlProps = Omit<QuotationSelectProps, 'onBlur'> & {
  control?: Control<any>;
  rules?: RegisterOptions;
};

const QuotationSelectControl: React.FC<QuotationSelectControlProps> = ({
  quotations = [],
  control,
  id,
  isLoading,
  name,
  onChange,
  placeholder,
  rules,
  ...props
}) => {
  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      rules={rules}
      render={({ field: { onChange: onChangeField, ...field } }) => {
        const onChangeHandler = (selected?: Quotation) => {
          onChangeField(selected?.id);
          onChange && onChange(selected);
        };
        return (
          <QuotationSelect
            {...props}
            {...field}
            id={id}
            isLoading={isLoading}
            onChange={onChangeHandler}
            placeholder={placeholder}
            quotations={quotations}
          />
        );
      }}
    />
  );
};

export { QuotationSelectControl };
