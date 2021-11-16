import React, { useEffect } from 'react';

import { useCategoryLookup } from '@api';
import { CategorySelect, ICategorySelectProps } from '@components';
import { CategoryType } from '@models';

const CategorySelectContainer: React.FC<IProps> = ({ type, ...props }) => {
  const { data: categories, isLoading, refetch } = useCategoryLookup(type);

  useEffect(() => {
    refetch();
  }, []);

  return <CategorySelect categories={categories} isLoading={isLoading} {...props} />;
};

interface IProps extends Omit<ICategorySelectProps, 'accounts' | 'isLoading'> {
  type: CategoryType;
}

export { CategorySelectContainer };
