import React, { useState } from 'react';

import { ScaleFade } from '@chakra-ui/react';

import { Category } from '@entities';

import SubCategoryListItem from '../sub-list-item';

interface IProps {
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
  parent: Category;
  subCategories: Category[];
}

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
        <ScaleFade in={true} key={category.id} style={{ width: '100%' }}>
          <SubCategoryListItem
            isSelected={selected === category.id}
            onDeleted={onDeleted}
            onSelected={setSelected}
            onUpdated={onUpdated}
            parent={parent}
            subCategory={category}
          />
        </ScaleFade>
      ))}
    </>
  );
};

export default SubCategoryList;
