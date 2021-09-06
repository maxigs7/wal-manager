import React, { useEffect } from 'react';

import { Portal, SimpleGrid } from '@chakra-ui/react';

import { useCategories } from '@app/api/categories';
import { CategoryPanel, SubCategoryPanel } from '@app/components';
import { CategoryDeleteDialog, CategoryModalForm } from '@app/containers';
import { Card, Page } from '@lib/wal-ui';

import useStore from './store/useStore';

const CategoriesPage: React.FC = () => {
  const [state, dispatch] = useStore();
  const [{ data: categories, isLoading }, dispatchList] = useCategories();

  const request = () => dispatchList.requestList(state.selectedType);

  const onClose = (success: boolean) => {
    if (success) {
      dispatch.onModalClose();
      request();
    }
  };

  const onDialogClose = (success: boolean) => {
    if (success) {
      dispatch.onDialogClose();
    }
  };

  useEffect(() => {
    request();
  }, [state.selectedType]);

  // Effects
  useEffect(() => {
    if (categories && categories.length && !state.selected) {
      dispatch.select(categories[0]);
    }
  }, [categories]);

  console.log('CategoriesPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
          <Card>
            <CategoryPanel
              categories={categories}
              isLoading={isLoading}
              onCreated={dispatch.create}
              onSelected={dispatch.select}
              onTypeSelected={dispatch.selectType}
              selected={state.selected}
              selectedType={state.selectedType}
            />
          </Card>
          <Card>
            <SubCategoryPanel
              category={state.selected}
              isLoading={isLoading}
              onCategoryDeleted={dispatch.remove}
              onCategoryUpdated={dispatch.update}
              onCreated={() => console.log('Creating')}
              onDeleted={() => console.log('Deleting')}
              onEdited={() => console.log('Editing')}
              subCategories={state.selected?.subCategories}
            />
          </Card>
        </SimpleGrid>
      </Page>
      <Portal>
        {state.isModalOpen && (
          <CategoryModalForm
            id={state.id}
            isOpen={state.isModalOpen}
            onClose={onClose}
            type={state.selectedType}
          />
        )}
        {state.isDialogOpen && (
          <CategoryDeleteDialog id={state.id} isOpen={state.isDialogOpen} onClose={onDialogClose} />
        )}
      </Portal>
    </>
  );
};

export default CategoriesPage;
