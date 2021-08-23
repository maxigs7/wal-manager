import React, { useEffect } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { useCategoriesByType } from '@app/api/categories';
import { CategoryPanel } from '@app/modules/category';
import { CategoryModalForm } from '@app/modules/category/containers/modal-form';
import { Card, Page } from '@app/modules/common';
import { SubCategoryPanel } from '@app/modules/sub-category';
import { FirestoreStatus } from '@lib/firebase';

import useStore from './store/useStore';

const CategoriesPage: React.FC = () => {
  const [state, dispatch] = useStore();

  // Firestore
  const { data: categories, status } = useCategoriesByType(state.selectedType);

  // Effects
  useEffect(() => {
    if (categories && categories.length && !state.selectedCategory) {
      dispatch.selectCategory(categories[0]);
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
              isLoading={status === FirestoreStatus.LOADING}
              onCreated={() => dispatch.createCategory()}
              onSelected={dispatch.selectCategory}
              onTypeSelected={dispatch.selectCategoryType}
              selected={state.selectedCategory}
              selectedType={state.selectedType}
            />
          </Card>
          <Card>
            <SubCategoryPanel
              category={state.selectedCategory}
              isLoading={status === FirestoreStatus.LOADING}
              onCategoryEdited={dispatch.editCategory}
              onCreated={() => console.log('Creating')}
              onDeleted={() => console.log('Deleting')}
              onEdited={() => console.log('Editing')}
              subCategories={state.selectedCategory?.subCategories}
            />
          </Card>
        </SimpleGrid>
      </Page>
      <CategoryModalForm
        id={state.selectedCategory?.id}
        isOpen={state.isOpen}
        onClose={dispatch.onClose}
        type={state.selectedType}
      />
    </>
  );
};

export default CategoriesPage;
