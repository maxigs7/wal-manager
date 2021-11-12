import { useEffect } from 'react';

import { Portal } from '@chakra-ui/react';

import { useSubCategoryList } from '@api';
import { SubCategoryPanel } from '@components';
import { CategoryDeleteDialog, SubCategoryModalForm } from '@containers';
import { Card } from '@lib/wal-ui';
import { Category } from '@models';
import { useSubCategoriesStore } from '@stores';

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
  const { data: categories, isLoading, refetch } = useSubCategoryList(selected?.id as string);
  const [state, dispatch] = useSubCategoriesStore();

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
          onCreated={() => dispatch.onOpenForm()}
          onDeleted={(id: string) => dispatch.onOpenForm(id, true)}
          onUpdated={(id: string) => dispatch.onOpenForm(id)}
          subCategories={categories}
        />
      </Card>
      <Portal>
        {state.isOpenForm && (
          <SubCategoryModalForm
            id={state.id}
            isOpen={state.isOpenForm}
            onConfirmed={dispatch.onConfirmedForm}
            onDismiss={dispatch.onDismissForm}
            parent={selected as Category}
          />
        )}
        {state.isOpenRemove && (
          <CategoryDeleteDialog
            id={state.id}
            isOpen={state.isOpenRemove}
            mutationKey="sub-categories"
            onConfirmed={dispatch.onConfirmedForm}
            onDismiss={dispatch.onDismissForm}
          />
        )}
      </Portal>
    </>
  );
};
