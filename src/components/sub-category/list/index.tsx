import React, { useState } from 'react';

import { Category } from '@models';

import { SubCategoryListItem } from '../list-item';

const SubCategoryList: React.FC<IProps> = ({
  onDeleted,
  onUpdated,
  parent,
  subCategories = [],
}) => {
  const [selected, setSelected] = useState<string>();
  return (
    <>
      {subCategories.map((category) => (
        <SubCategoryListItem
          isSelected={selected === category.id}
          key={category.id}
          onDeleted={onDeleted}
          onSelected={setSelected}
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
