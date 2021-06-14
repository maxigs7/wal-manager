import React from 'react';

import { Category } from '@app/api/categories';

import { ListItem } from '../list-item';
import { ListWrapper } from '../list-wrapper';

interface Props {
  categories: Category[];
  onSelected: (category: Category) => void;
  selectedCategory?: Category;
}

export const List: React.FC<Props> = ({ categories = [], onSelected, selectedCategory }) => {
  console.log('CategoriesList component rendering...');
  return (
    <ListWrapper>
      {categories.map((category) => (
        <ListItem
          category={category}
          isActive={category === selectedCategory}
          key={category.id}
          selectedCategory={onSelected}
        />
      ))}
    </ListWrapper>
  );
};
