import React from 'react';

import { CategoryTable, CategoryTableActions } from '../../components';
import { useCategorySelectRow } from '../../hooks';

const CategoryTableContainer: React.FC<CategoryTableActions> = ({
  onRemove,
  onSubCreate,
  onSubMove,
  onSubUpdate,
  onUpdate,
}) => {
  const { data: categories, isLoading } = useCategorySelectRow();

  return (
    <CategoryTable
      data={categories || []}
      isLoading={isLoading}
      onRemove={onRemove}
      onSubCreate={onSubCreate}
      onSubMove={onSubMove}
      onSubUpdate={onSubUpdate}
      onUpdate={onUpdate}
    />
  );
};

export { CategoryTableContainer };
