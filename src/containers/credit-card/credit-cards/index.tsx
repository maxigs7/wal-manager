import { useCallback, useEffect } from 'react';

import { CategoryPanel } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { Category } from '@app/models/categories';
import { CategoryType } from '@app/models/common';
import {
  CATEGORIES_REQUEST,
  selectCategories,
  CATEGORY_SELECTED,
  CATEGORY_TYPE_SELECTED,
} from '@app/stores/categories';
import { Card } from '@lib/wal-ui';

interface IProps {
  onCreated(): void;
}

export const CategoriesListCard: React.FC<IProps> = ({ onCreated }) => {
  const { data: categories, isLoading } = useAppSelector(selectCategories);
  const userId = useAppSelector((state) => state.auth.userId);
  const selectedType = useAppSelector((state) => state.categories.type);
  const selected = useAppSelector((state) => state.categories.selected);
  const dispatch = useAppDispatch();

  const onCategorySelected = useCallback((category: Category) => {
    dispatch(CATEGORY_SELECTED(category));
  }, []);
  const onTypeSelected = useCallback((type: CategoryType) => {
    dispatch(CATEGORY_TYPE_SELECTED(type));
  }, []);

  useEffect(() => {
    if (userId && selectedType) {
      dispatch(
        CATEGORIES_REQUEST({
          categoryType: selectedType,
        }),
      );
    }
  }, [userId, selectedType]);

  return (
    <Card>
      <CategoryPanel
        categories={categories}
        isLoading={isLoading}
        onCreated={onCreated}
        onSelected={onCategorySelected}
        onTypeSelected={onTypeSelected}
        selected={selected}
        selectedType={selectedType}
      />
    </Card>
  );
};
