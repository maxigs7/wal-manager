import { useEffect } from 'react';

import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { CategoryPanel } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import {
  REQUEST_CATEGORIES,
  selectCategories,
  SELECT_CATEGORY,
  SELECT_CATEGORY_TYPE,
} from '@app/stores/categories';
import { Card } from '@lib/wal-ui';

export const CategoriesListCard: React.FC = () => {
  const { data: categories, isLoading } = useAppSelector(selectCategories);
  const userId = useAppSelector((state) => state.auth.userId);
  const selectedType = useAppSelector((state) => state.categories.type);
  const selected = useAppSelector((state) => state.categories.selected);
  const dispatch = useAppDispatch();

  const onCategorySelected = (category: Category) => {
    dispatch(SELECT_CATEGORY(category));
  };
  const onTypeSelected = (type: CategoryType) => {
    dispatch(SELECT_CATEGORY_TYPE(type));
  };

  useEffect(() => {
    if (userId && selectedType) {
      dispatch(
        REQUEST_CATEGORIES({
          categoryType: selectedType,
          userId: userId,
        }),
      );
    }
  }, [userId, selectedType]);

  return (
    <Card>
      <CategoryPanel
        categories={categories}
        isLoading={isLoading}
        onCreated={() => console.log('Creating')}
        onSelected={onCategorySelected}
        onTypeSelected={onTypeSelected}
        selected={selected}
        selectedType={selectedType}
      />
    </Card>
  );
};
