import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { CategorySelect, ICategorySelectProps } from '../select';

export interface ICategorySelectControlProps
  extends Omit<ICategorySelectProps, 'onBlur' | 'onChange' | ''> {
  control?: Control<any>;
  rules?: RegisterOptions;
}

const CategorySelectControl: React.FC<ICategorySelectControlProps> = ({
  categories = [],
  control,
  id,
  isLoading,
  name,
  placeholder,
  rules,
}) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <CategorySelect
      {...field}
      categories={categories}
      id={id}
      isLoading={isLoading}
      placeholder={placeholder}
    />
  );
};

export { CategorySelectControl };
