import React, { useMemo, useState } from 'react';

import { Category, useCategoriesByType } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { SubCategoriesList } from '@app/components/sub-category';
import { CategoryTitle } from '@app/components/sub-category/title';
import { FirestoreStatus } from '@app/hooks/useFirestoreQuery';
import { CategoryPanel } from '@app/modules/category';
import { CardContainer } from '@app/modules/common';

const styles = {
  subcategories: 'md:col-span-2 bg-gray-200',
  wrapper: 'grid md:grid-cols-3',
};

const CategoriesPage: React.FC = () => {
  // States
  const [selectedCategoryType, setSelectedCategoryType] = useState<CategoryType>(
    CategoryType.Expense,
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(null as Category);
  // Firestore
  const { data: categories, status } = useCategoriesByType(selectedCategoryType);
  const isLoading = useMemo(() => status === FirestoreStatus.LOADING, [status]);

  console.log('CategoriesPage rendering...');
  if (categories && categories.length && !selectedCategory) {
    setSelectedCategory(categories[0]);
  }

  return (
    <CardContainer>
      <div className={styles.wrapper}>
        <CategoryPanel
          categories={categories || []}
          categorySelected={selectedCategory}
          categoryTypeSelected={selectedCategoryType}
          isLoading={status === FirestoreStatus.LOADING}
          onCategorySelected={setSelectedCategory}
          onCategoryTypeSelected={setSelectedCategoryType}
          onCreate={() => console.log('Creating')}
        />

        <div className={styles.subcategories}>
          <CategoryTitle category={selectedCategory} isLoading={isLoading} />
          <SubCategoriesList subCategories={[]} />
        </div>
      </div>
    </CardContainer>
  );
};

export default CategoriesPage;
