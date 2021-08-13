import React, { useCallback, useEffect, useState } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { Category, useCategoriesByType } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { FirestoreStatus } from '@app/hooks/useFirestoreQuery';
import { CategoryPanel } from '@app/modules/category';
import { Card, Page } from '@app/modules/common';
import { SubCategoryPanel } from '@app/modules/sub-category';

const CategoriesPage: React.FC = () => {
  // States
  const [selectedCategoryType, setSelectedCategoryType] = useState<CategoryType>(
    CategoryType.Expense,
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  // Firestore
  const { data: categories, status } = useCategoriesByType(selectedCategoryType);

  // Handlers
  const onCategoryTypeSelected = useCallback((categoryType: CategoryType) => {
    setSelectedCategoryType(categoryType);
    setSelectedCategory(undefined);
  }, []);

  // Effects
  useEffect(() => {
    if (categories && categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  console.log('CategoriesPage rendering...');

  return (
    <Page metaTitle="Mis Categorias" title="Mis Categorias">
      <SimpleGrid columns={[1, 1, 2]} spacing={3} templateColumns={['1', '1', '2fr 3fr']}>
        <Card>
          <CategoryPanel
            categories={categories}
            isLoading={status === FirestoreStatus.LOADING}
            onCreated={() => console.log('Creating')}
            onSelected={setSelectedCategory}
            onTypeSelected={onCategoryTypeSelected}
            selected={selectedCategory}
            selectedType={selectedCategoryType}
          />
        </Card>
        <Card>
          <SubCategoryPanel
            category={selectedCategory}
            isLoading={status === FirestoreStatus.LOADING}
            onCategoryEdited={() => console.log('Editing')}
            onCreated={() => console.log('Creating')}
            onDeleted={() => console.log('Deleting')}
            onEdited={() => console.log('Editing')}
            subCategories={selectedCategory?.subCategories}
          />
        </Card>
      </SimpleGrid>
    </Page>
  );
};

export default CategoriesPage;
