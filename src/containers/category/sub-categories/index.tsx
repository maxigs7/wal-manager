import { useEffect } from 'react';

import { SubCategoryPanel } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux';
import { REQUEST_SUBCATEGORIES, selectSubCategories } from '@app/stores/categories';
import { Card } from '@lib/wal-ui';

export const SubCategoriesListCard: React.FC = () => {
  const { data: categories, isLoading } = useAppSelector(selectSubCategories);
  const userId = useAppSelector((state) => state.auth.userId);
  const selected = useAppSelector((state) => state.categories.selected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId && selected?.id) {
      dispatch(
        REQUEST_SUBCATEGORIES({
          categoryId: selected.id,
          userId: userId,
        }),
      );
    }
  }, [userId, selected?.id]);

  return (
    <Card>
      <SubCategoryPanel
        category={selected}
        isLoading={isLoading}
        onCategoryDeleted={() => console.log('Deleting')}
        onCategoryUpdated={() => console.log('Deleting')}
        onCreated={() => console.log('Creating')}
        onDeleted={() => console.log('Deleting')}
        onEdited={() => console.log('Editing')}
        subCategories={categories}
      />
    </Card>
  );
};
