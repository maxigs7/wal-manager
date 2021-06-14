import React from 'react';

import { Category } from '@app/api/categories';
import classnames from '@lib/classnames';

interface Props {
  category: Category;
  isActive: boolean;
  selectedCategory: (category: Category) => void;
}

const styles = {
  listItem: (isActive: boolean) =>
    classnames(
      'block p-5 active:bg-primary-700 hover:bg-primary-600 active:text-white hover:text-white',
      isActive && `bg-primary-600 text-white`,
    ),
};

export const CategoryItem: React.FC<Props> = React.memo(
  ({ category, isActive, selectedCategory }) => (
    <a
      className={styles.listItem(isActive)}
      href="#"
      key={category.id}
      onClick={() => selectedCategory(category)}
    >
      {category.name}
    </a>
  ),
);
