// import React, { useEffect } from 'react';
import React from 'react';

// import { Portal, SimpleGrid } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';

// import { Category, useCategories } from '@app/api/categories';
// import { CategoryPanel, SubCategoryPanel } from '@app/components';
// import { CategoryDeleteDialog, CategoryModalForm } from '@app/containers';
// import { Card, Page } from '@lib/wal-ui';
import { CategoriesListCard, SubCategoriesListCard } from '@app/containers';
import { Page } from '@lib/wal-ui';

// import useStore from './store/useStore';

const CategoriesPage: React.FC = () => {
  // const [state, dispatch] = useStore();
  // const [{ categories, categoriesIsLoading, subCategories, subCategoriesIsLoading }, dispatchList] =
  //   useCategories();

  // const requestCategories = () => dispatchList.requestCategories(state.selectedType);

  // const onClose = (id?: string) => {
  //   dispatch.onModalClose();
  //   if (id) {
  //     requestCategories();
  //   }
  // };

  // const onDialogClose = (success: boolean) => {
  //   dispatch.onDialogClose();
  //   if (success) {
  //     requestCategories();
  //   }
  // };

  // useEffect(() => {
  //   requestCategories();
  // }, [state.selectedType]);

  // useEffect(() => {
  //   if (state.selected?.id) {
  //     dispatchList.requestSubcategories(state.selected.id);
  //   }
  // }, [state.selected]);

  // // Effects
  // useEffect(() => {
  //   if (categories && categories.length) {
  //     const selected = categories.find(
  //       (category, index) => state.selected?.id === category.id || (!state.selected && index === 0),
  //     );
  //     dispatch.select(selected as Category);
  //   }
  // }, [categories]);

  console.log('CategoriesPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
          <CategoriesListCard />
          <SubCategoriesListCard />
        </SimpleGrid>
      </Page>
      {/* <Portal>
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
      </Portal> */}
    </>
  );
};

export default CategoriesPage;
