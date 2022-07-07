import React from 'react';

import { CategoryType } from '@models';

import { CategorySelectControl, ICategorySelectControlProps } from '../../components';
import { useCategoryList } from '../../hooks';

interface IProps extends Omit<ICategorySelectControlProps, 'categories' | 'isLoading'> {
  type: CategoryType;
}

const SelectControl: React.FC<IProps> = ({ type, ...props }) => {
  const { data: categories, isLoading } = useCategoryList(type);
  return <CategorySelectControl categories={categories} isLoading={isLoading} {...props} />;
};

export default SelectControl;
