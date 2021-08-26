import React, { useEffect } from 'react';

import { Portal, SimpleGrid } from '@chakra-ui/react';

import { useCategories } from '@app/api/categories';
import { CategoryPanel } from '@app/modules/category';
import { CategoryDeleteDialog } from '@app/modules/category/containers';
import { CategoryModalForm } from '@app/modules/category/containers/modal-form';
import { Card, Page } from '@app/modules/common';
import { SubCategoryPanel } from '@app/modules/sub-category';

import useStore from './store/useStore';

const CategoriesPage: React.FC = () => {
  const [state, dispatch] = useStore();
  const [{ data: categories, isLoading }, dispatchList] = useCategories();

  const request = () => dispatchList.requestList(state.selectedType);

  const onClose = () => {
    dispatch.onModalClose();
    request();
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
            id={state.categoryId}
            isOpen={state.isModalOpen}
            onClose={onClose}
            type={state.selectedType}
          />
        )}
        {state.isDialogOpen && (
          <CategoryDeleteDialog
            id={state.categoryId}
            isOpen={state.isDialogOpen}
            onClose={dispatch.onDialogClose}
          />
        )}
      </Portal>
    </>
  );
};

export default CategoriesPage;
