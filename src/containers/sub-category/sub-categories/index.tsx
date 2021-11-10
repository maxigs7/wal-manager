import { useEffect } from 'react';

import { useSubCategoryList } from '@api';
import { SubCategoryPanel } from '@components';
import { Card } from '@lib/wal-ui';
import { Category } from '@models';

interface IProps {
  onCategoryDeleted(id: string): void;
  onCategoryUpdated(id: string): void;
  selected?: Category;
}

export const SubCategoriesListCard: React.FC<IProps> = ({
  onCategoryUpdated,
  onCategoryDeleted,
  selected,
}) => {
  const { data: categories, isLoading, refetch } = useSubCategoryList(selected?.id);

  useEffect(() => {
    if (selected?.id) {
      refetch();
    }
  }, [selected?.id]);

  return (
    <>
      <Card>
        <SubCategoryPanel
          category={selected}
          isLoading={isLoading}
          onCategoryDeleted={onCategoryDeleted}
          onCategoryUpdated={onCategoryUpdated}
          onCreated={() => console.log('Creating')}
          onDeleted={() => console.log('Deleting')}
          onEdited={() => console.log('Editing')}
          subCategories={categories}
        />
      </Card>
    </>
  );
};
