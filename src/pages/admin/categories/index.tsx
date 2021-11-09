import React from 'react';

import { Portal, SimpleGrid } from '@chakra-ui/react';

import {
  CategoriesListCard,
  CategoryDeleteDialog,
  CategoryModalForm,
  SubCategoriesListCard,
} from '@containers';
import { Page } from '@lib/wal-ui';
import { useStore } from '@stores/categories';

const CategoriesPage: React.FC = () => {
  const [state, dispatch] = useStore();

  console.log('CategoriesPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
          <CategoriesListCard
            onCreated={dispatch.formModal.onOpen}
            onSelected={dispatch.onSelected}
            onSelectedType={dispatch.onSelectedType}
            selected={state.selected}
            type={state.selectedType}
          />
          <SubCategoriesListCard
            onCategoryDeleted={dispatch.removeModal.onOpen}
            onCategoryUpdated={dispatch.formModal.onOpen}
            selected={state.selected}
          />
        </SimpleGrid>
      </Page>
      <Portal>
        {state.isOpenForm && (
          <CategoryModalForm
            id={state.id}
            isOpen={state.isOpenForm}
            onClose={dispatch.formModal.onClose}
            type={state.selectedType}
          />
        )}
        {state.isOpenRemove && (
          <CategoryDeleteDialog
            id={state.id}
            isOpen={state.isOpenRemove}
            onClose={dispatch.removeModal.onClose}
          />
        )}
      </Portal>
    </>
  );
};

export default CategoriesPage;
