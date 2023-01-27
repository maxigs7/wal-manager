import React from 'react';

import { CategorySelect, ICategorySelectProps } from '../../components';
import { useCategorySelectLookup } from '../../hooks';

interface IProps extends Omit<ICategorySelectProps, 'categories' | 'isLoading'> {}

const CategorySelectContainer: React.FC<IProps> = (props) => {
  const { data: categories, isLoading } = useCategorySelectLookup();

  return <CategorySelect categories={categories} isLoading={isLoading} {...props} />;
};

export { CategorySelectContainer };
