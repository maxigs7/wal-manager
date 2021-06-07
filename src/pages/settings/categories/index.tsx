import React, { useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Category, useCategories } from '@app/api/categories';
import { CategoriesList, CategoryTitle, SubCategoryList } from '@app/components/category';
import { Button, CardContainer } from '@app/components/ui';
import { ButtonSizes } from '@app/components/ui/buttons/types';
import { FirestoreStatus } from '@app/hooks/useFirestoreQuery';

const styles = {
  createButton: '',
  subcategories: 'md:col-span-2 bg-gray-200',
  title: 'text-2xl flex-1',
  titleBar: 'p-5 flex border-b',
  wrapper: 'grid md:grid-cols-3',
};

const CategoriesPage: React.FC = () => {
  // Subscribe to Firestore document
  const { data: categories, status } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const isLoading = useMemo(() => status === FirestoreStatus.LOADING, [status]);

  console.log('CategoriesPage rendering...');
  if (categories && categories.length && !selectedCategory) {
    setSelectedCategory(categories[0]);
  }

  return (
    <>
      <CardContainer>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.titleBar}>
              <h2 className={styles.title}>Categorias</h2>
              <Button className={styles.createButton} size={ButtonSizes.SMALL} rounded>
                <FontAwesomeIcon icon="plus" fixedWidth />
              </Button>
            </div>
            <CategoriesList
              categories={categories || []}
              isLoading={isLoading}
              onSelected={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>

          <div className={styles.subcategories}>
            <CategoryTitle category={selectedCategory} isLoading={isLoading} />
            <SubCategoryList categories={selectedCategory?.subCategories} isLoading={isLoading} />
          </div>
        </div>
      </CardContainer>
    </>
  );
};

export default CategoriesPage;
