import React from 'react';

import { Category } from '@app/api/categories';

import { CategoryListItem } from '../list-item';

const CategoryList: React.FC<IProps> = ({ categories = [], onSelected, selectedCategory }) => {
  console.log('CategoriesList component rendering...', selectedCategory);
  return (
    <>
      {categories.map((category) => (
        <CategoryListItem
          category={category}
          isActive={category === selectedCategory}
          key={category.id}
          selectedCategory={onSelected}
        />
      ))}
    </>
  );
};

interface IProps {
  categories: Category[];
  onSelected: (category: Category) => void;
  selectedCategory?: Category;
}

export { CategoryList };
