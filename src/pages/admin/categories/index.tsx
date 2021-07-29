import React, { useCallback, useEffect, useState } from 'react';

import { Category, useCategoriesByType } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { FirestoreStatus } from '@app/hooks/useFirestoreQuery';
import { CategoryPanel } from '@app/modules/category';
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
    <div className={styles.wrapper}>
      <CategoryPanel
        categories={categories || []}
        categorySelected={selectedCategory}
        categoryTypeSelected={selectedCategoryType}
        isLoading={status === FirestoreStatus.LOADING}
        onCategorySelected={setSelectedCategory}
        onCategoryTypeSelected={onCategoryTypeSelected}
        onCreate={() => console.log('Creating')}
      />
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
    </div>
  );
};

export default CategoriesPage;
