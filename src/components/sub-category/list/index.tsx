import React from 'react';

import { Category } from '@models';

import { SubCategoryListItem } from '../list-item';

const SubCategoryList: React.FC<IProps> = ({ subCategories = [], onDeleted, onUpdated }) => {
  console.log('SubCategoriesList component rendering...');
  return (
    <>
      {subCategories.map((category) => (
        <SubCategoryListItem
          key={category.id}
          onDeleted={onDeleted}
          onUpdated={onUpdated}
          subCategory={category}
        />
      ))}
    </>
  );
};

interface IProps {
  subCategories: Category[];
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
}

export { SubCategoryList };
export {};
