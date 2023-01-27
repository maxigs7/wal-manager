import React from 'react';

import { Control, Controller, RegisterOptions, useController } from 'react-hook-form';

import { CategoryLookup } from '../../models';
import { CategorySelect, ICategorySelectProps } from '../select';

export interface ICategorySelectControlProps extends Omit<ICategorySelectProps, 'onBlur'> {
  control?: Control<any>;
  rules?: RegisterOptions;
}

const CategorySelectControl: React.FC<ICategorySelectControlProps> = ({
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
      render={({ field: { onChange: onChangeField, onBlur, ...field } }) => {
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
