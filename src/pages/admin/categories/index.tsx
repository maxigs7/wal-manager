// import React, { useEffect } from 'react';
import React, { useState } from 'react';

// import { Portal, SimpleGrid } from '@chakra-ui/react';
import { Portal, SimpleGrid, useDisclosure } from '@chakra-ui/react';

// import { Category, useCategories } from '@app/api/categories';
// import { CategoryPanel, SubCategoryPanel } from '@app/components';
// import { CategoryDeleteDialog, CategoryModalForm } from '@app/containers';
// import { Card, Page } from '@lib/wal-ui';
import { CategoriesListCard, CategoryModalForm, SubCategoriesListCard } from '@app/containers';
import { useAppSelector } from '@app/hooks';
import { selectSelectedCategory } from '@app/stores/categories';
import { Page } from '@lib/wal-ui';

const CategoriesPage: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const [categoryId, setCategoryId] = useState<string>();

  const onCategoryClosed = () => {
    setCategoryId(undefined);
    onClose();
  };

  const onCategoryUpdated = () => {
    setCategoryId(selectedCategory?.id);
    onOpen();
  };

  console.log('CategoriesPage rendering...');

  return (
    <>
      <Page metaTitle="Mis Categorias" title="Mis Categorias">
        <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
          <CategoriesListCard onCreated={onOpen} />
          <SubCategoriesListCard onCategoryUpdated={onCategoryUpdated} />
        </SimpleGrid>
      </Page>
      <Portal>
        {isOpen && <CategoryModalForm id={categoryId} isOpen={isOpen} onClose={onCategoryClosed} />}
        {/* {state.isDialogOpen && (
          <CategoryDeleteDialog id={state.id} isOpen={state.isDialogOpen} onClose={onDialogClose} />
        )} */}
      </Portal>
    </>
  );
};

export default CategoriesPage;
