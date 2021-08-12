import React, { useCallback, useEffect, useState } from 'react';

import { Grid } from '@chakra-ui/react';

import { Category, useCategoriesByType } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { FirestoreStatus } from '@app/hooks/useFirestoreQuery';
import { CategoryPanel, CategoryList, CategoryListEmpty } from '@app/modules/category';
import { Card, ColorCircle, Page } from '@app/modules/common';
import { SubCategoryPanel } from '@app/modules/sub-category';

const styles = {
  subcategories: 'md:col-span-2 bg-gray-200',
  wrapper: 'grid md:grid-cols-3 h-full',
};

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
      <Grid gap={3} templateColumns="repeat(2, 1fr)">
        <Card>
          <CategoryPanel
            categoryTypeSelected={selectedCategoryType}
            isLoading={status === FirestoreStatus.LOADING}
            onCategoryTypeSelected={onCategoryTypeSelected}
            onCreated={() => console.log('Creating')}
          >
            {!categories?.length && <CategoryListEmpty onCreated={() => console.log('Creating')} />}
            {!!categories?.length && (
              <CategoryList
                categories={categories}
                onSelected={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            )}
            <ColorCircle bg="red.600" />
          </CategoryPanel>
        </Card>
        <Card>
          <SubCategoryPanel
            category={selectedCategory}
            className={styles.subcategories}
            isLoading={status === FirestoreStatus.LOADING}
            onCategoryEdit={() => console.log('Creating')}
            onCreate={() => console.log('Creating')}
            onDelete={() => console.log('Deleting')}
            onEdit={() => console.log('Editing')}
            subCategories={[]}
          />
        </Card>
      </Grid>
    </Page>
  );
};

export default CategoriesPage;
