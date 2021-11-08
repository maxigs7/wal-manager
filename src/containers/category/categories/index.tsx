import { useEffect } from 'react';

import { useCategoryList } from '@api';
import { CategoryPanel } from '@components';
import { Card } from '@lib/wal-ui';
import { Category } from '@models';
import { CategoryType } from '@models/common';

interface IProps {
  onCreated(): void;
  onSelected?(category: Category): void;
  onSelectedType(type: CategoryType): void;
  selected?: Category;
  type: CategoryType;
}

export const CategoriesListCard: React.FC<IProps> = ({
  onCreated,
  onSelected,
  onSelectedType,
  selected,
  type,
}) => {
  const { data: categories, isLoading, refetch } = useCategoryList(type);

  useEffect(() => {
    refetch();
  }, [type]);

  return (
    <Card>
      <CategoryPanel
        categories={categories}
        isLoading={isLoading}
        onCreated={onCreated}
        onSelected={onSelected}
        onSelectedType={onSelectedType}
        selected={selected}
        selectedType={type}
      />
    </Card>
  );
};
