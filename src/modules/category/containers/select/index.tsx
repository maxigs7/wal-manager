import React from 'react';

import { CategoryType } from '@models';

import { CategorySelect, ICategorySelectProps } from '../../components';
import { useCategoryList } from '../../hooks';

interface IProps extends Omit<ICategorySelectProps, 'categories' | 'isLoading'> {
  type: CategoryType;
}

const Select: React.FC<IProps> = ({ type, ...props }) => {
  const { data: categories, isLoading } = useCategoryList(type);

  return <CategorySelect categories={categories} isLoading={isLoading} {...props} />;
};

export default Select;
