'use client';

import React from 'react';

import { Control, Controller, RegisterOptions } from 'react-hook-form';

import { CategorySelect, CategorySelectProps } from '../category-select';
import { CategoryLookup } from '../models';

export type CategorySelectControlProps = Omit<CategorySelectProps, 'onBlur'> & {
  control?: Control<any>;
  rules?: RegisterOptions;
};

const CategorySelectControl: React.FC<CategorySelectControlProps> = ({
  categories = [],
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
        const onChangeHandler = (selected?: CategoryLookup) => {
          onChangeField(selected?.id);
          onChange && onChange(selected);
        };
        return (
          <CategorySelect
            {...props}
            {...field}
            categories={categories}
            id={id}
            isLoading={isLoading}
            onChange={onChangeHandler}
            placeholder={placeholder}
          />
        );
      }}
    />
  );
};

export { CategorySelectControl };
