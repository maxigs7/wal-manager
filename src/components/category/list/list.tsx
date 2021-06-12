/* eslint-disable no-constant-condition */
import React from 'react';

import { Category } from '@app/api/categories';

import { CategoryItem } from './item';
import { CategoriesWrapper } from './wrapper';

interface Props {
  categories: Category[];
  onSelected: (category: Category) => void;
  selectedCategory?: Category;
}

export const CategoriesList: React.FC<Props> = React.memo(
  ({ categories = [], onSelected, selectedCategory }) => {
    console.log('CategoriesList component rendering...');
    return (
      <CategoriesWrapper>
        {categories.map((category) => (
          <CategoryItem
            category={category}
            isActive={category === selectedCategory}
            key={category.id}
            selectedCategory={onSelected}
          />
        ))}
      </CategoriesWrapper>
    );
  },
);
