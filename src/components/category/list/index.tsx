import React from 'react';

import { Category } from '@app/models/categories';

import { CategoryListItem } from '../list-item';

const CategoryList: React.FC<IProps> = ({ categories = [], onSelected, selected }) => {
  console.log('CategoriesList component rendering...', selected);
  return (
    <>
      {categories.map((category) => (
        <CategoryListItem
          category={category}
          isActive={category === selected}
          key={category.id}
          onSelected={onSelected}
        />
      ))}
    </>
  );
};

interface IProps {
  categories: Category[];
  onSelected?(category: Category): void;
  selected?: Category;
}

export { CategoryList };
