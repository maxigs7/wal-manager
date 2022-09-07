import React from 'react';

import { ContentLoader } from '@shared';

import { CategoryTable, CategoryTableActions } from '../../components';
import { useCategoryRows } from '../../hooks';
import { useCategoryFilter } from '../../providers';

const CategoryTableContainer: React.FC<CategoryTableActions> = ({
  onRemove,
  onSubCreate,
  onSubMove,
  onSubRemove,
  onSubUpdate,
  onUpdate,
}) => {
  const [state] = useCategoryFilter();
  const { data: categories, isLoading } = useCategoryRows(state.type);

  return (
    <CategoryTable
      data={categories || []}
      isLoading={isLoading}
      onRemove={onRemove}
      onSubCreate={onSubCreate}
      onSubMove={onSubMove}
      onSubRemove={onSubRemove}
      onSubUpdate={onSubUpdate}
      onUpdate={onUpdate}
    />
  );
};

export { CategoryTableContainer };
