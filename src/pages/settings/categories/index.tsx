import React, { useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Category, useCategoriesByType } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { CategoriesList, CategoryTitle, SubCategoryList } from '@app/components/category';
import { CategoriesEmpty } from '@app/components/category/list/empty';
import { CategoriesSkeleton } from '@app/components/category/list/skeleton';
import { Button, CardContainer } from '@app/components/ui';
import { ButtonColors, ButtonShapes, ButtonSizes } from '@app/components/ui/buttons/types';
import { FirestoreStatus } from '@app/hooks/useFirestoreQuery';
import classnames from '@lib/classnames';

const styles = {
  buttonTypes: (isActive: boolean) =>
    classnames(
      'flex-1 p-5 hover:border-b-2 hover:border-primary-500',
      isActive && 'border-b-2 border-primary-500',
    ),
  categoryTypes: 'flex',
  createButton: '',
  subcategories: 'md:col-span-2 bg-gray-200',
  title: 'text-2xl flex-1',
  titleBar: 'p-5 flex border-b',
  wrapper: 'grid md:grid-cols-3',
};

const CategoriesPage: React.FC = () => {
  // States
  const [currentCategoryType, setCategoryType] = useState<CategoryType>(CategoryType.Expense);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  // Firestore
  const { data: categories, status } = useCategoriesByType(currentCategoryType);
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
              <Button
                className={styles.createButton}
                shape={ButtonShapes.CIRCLE}
                size={ButtonSizes.SMALL}
              >
                <FontAwesomeIcon icon="plus" fixedWidth />
              </Button>
            </div>
            <div className={styles.categoryTypes}>
              <Button
                className={styles.buttonTypes(currentCategoryType === CategoryType.Expense)}
                color={ButtonColors.TRANSPARENT}
                onClick={() => setCategoryType(CategoryType.Expense)}
                shape={ButtonShapes.SQUARE}
              >
                Gastos
              </Button>
              <Button
                className={styles.buttonTypes(currentCategoryType === CategoryType.Income)}
                color={ButtonColors.TRANSPARENT}
                onClick={() => setCategoryType(CategoryType.Income)}
                shape={ButtonShapes.SQUARE}
              >
                Ingresos
              </Button>
            </div>

            {status === FirestoreStatus.LOADING && <CategoriesSkeleton />}
            {status === FirestoreStatus.SUCCESS && categories && !categories.length && (
              <CategoriesEmpty />
            )}
            {status === FirestoreStatus.SUCCESS && categories && !!categories.length && (
              <CategoriesList
                categories={categories}
                onSelected={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            )}
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
