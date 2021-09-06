import React from 'react';

import { SubCategory } from '@app/api/categories';

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
  subCategories: SubCategory[];
  onDeleted?(subCategory: SubCategory): void;
  onEdited?(subCategory: SubCategory): void;
}

export { SubCategoryList };
