/* eslint-disable no-constant-condition */
import React from 'react';

import { Category } from '@app/api/categories';
import classnames from '@lib/classnames';

import { Skeleton } from '../skeleton';
import { CategoryItem } from './item';

interface Props {
  categories: Category[];
  isLoading: boolean;
  onSelected: (category: Category) => void;
  selectedCategory?: Category;
}

const styles = {
  categories: (isLoading: boolean) => classnames('bg-white', isLoading && 'p-5'),
};

export const CategoriesList: React.FC<Props> = React.memo(
  ({ categories = [], isLoading, onSelected, selectedCategory }) => {
    console.log('CategoriesList component rendering...');
    return (
      <div className={styles.categories(isLoading)}>
        {isLoading ? (
          <Skeleton lines={4} />
        ) : (
          categories.map((category) => (
            <CategoryItem
              category={category}
              isActive={category === selectedCategory}
              key={category.id}
              selectedCategory={onSelected}
            />
          ))
        )}
      </div>
    );
  },
);
