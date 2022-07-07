import React from 'react';

import { CategoryType } from '@models';

import { CategorySelect, ICategorySelectProps } from '../../components';
import { useCategoryList } from '../../hooks';

interface IProps extends Omit<ICategorySelectProps, 'categories' | 'isLoading'> {
  fullSearch?: boolean;
  type?: CategoryType;
}

const Select: React.FC<IProps> = ({ fullSearch = false, type, ...props }) => {
  const { data: categories, isLoading } = useCategoryList(type, fullSearch);

  return <CategorySelect categories={categories} isLoading={isLoading} {...props} />;
};

export default Select;
