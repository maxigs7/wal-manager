import React from 'react';

import { Category } from '@models';

import { SubCategoryListItem } from '../list-item';

const SubCategoryList: React.FC<IProps> = ({
  onDeleted,
  onUpdated,
  parent,
  subCategories = [],
}) => {
  console.log('SubCategoriesList component rendering...');
  return (
    <>
      {subCategories.map((category) => (
        <SubCategoryListItem
          key={category.id}
          onDeleted={onDeleted}
          onUpdated={onUpdated}
          parent={parent}
          subCategory={category}
        />
      ))}
    </>
  );
};

interface IProps {
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
  parent: Category;
  subCategories: Category[];
}

export { SubCategoryList };
