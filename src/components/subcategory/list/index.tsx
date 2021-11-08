import React from 'react';

import { Category } from '@models';

import { SubCategoryListItem } from '../list-item';

const SubCategoryList: React.FC<IProps> = ({ subCategories = [], onDeleted, onEdited }) => {
  console.log('SubCategoriesList component rendering...');
  return (
    <>
      {subCategories.map((category) => (
        <SubCategoryListItem
          key={category.id}
          onDeleted={onDeleted}
          onEdited={onEdited}
          subCategory={category}
        />
      ))}
    </>
  );
};

interface IProps {
  subCategories: Category[];
  onDeleted?(subCategory: Category): void;
  onEdited?(subCategory: Category): void;
}

export { SubCategoryList };
export {};
