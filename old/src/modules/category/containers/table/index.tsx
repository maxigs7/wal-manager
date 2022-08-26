import React from 'react';

import { ContentLoader } from '@shared';

import { CategoryTable } from '../../components';
import { Actions } from '../../components/table/cells';
import { useCategoryRows } from '../../hooks';
import { useCategoryFilter } from '../../providers';

const Table: React.FC<Actions> = ({
  onRemove,
  onSubCreate,
  onSubMove,
  onSubRemove,
  onSubUpdate,
  onUpdate,
}) => {
  const [state] = useCategoryFilter();
  const { data: categories, isLoading } = useCategoryRows(state.type);

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <CategoryTable
      data={categories || []}
      minH="80"
      onRemove={onRemove}
      onSubCreate={onSubCreate}
      onSubMove={onSubMove}
      onSubRemove={onSubRemove}
      onSubUpdate={onSubUpdate}
      onUpdate={onUpdate}
    />
  );
};

export default React.memo(Table);
