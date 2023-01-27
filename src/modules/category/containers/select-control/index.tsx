import React from 'react';

import { CategorySelectControl, ICategorySelectControlProps } from '../../components';
import { GetCategoryFilters, useCategorySelectLookup } from '../../hooks';

type Props = Omit<ICategorySelectControlProps, 'categories' | 'isLoading'> & GetCategoryFilters;

const CategorySelectControlContainer: React.FC<Props> = ({
  excludeChildren,
  excludeId,
  ...props
}) => {
  const { data: categories, isLoading } = useCategorySelectLookup({ excludeChildren, excludeId });
  return <CategorySelectControl categories={categories} isLoading={isLoading} {...props} />;
};

export { CategorySelectControlContainer };
