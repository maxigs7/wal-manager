import React from 'react';

import { ScaleFade } from '@chakra-ui/react';

import { Category } from '@models';

import ListItem from '../root-list-item';

interface IProps {
  categories: Category[];
  onSelected?(category: Category): void;
  selectedId?: string;
}

const List: React.FC<IProps> = ({ categories = [], onSelected, selectedId }) => (
  <>
    {categories.map((category) => (
      <ScaleFade in={true} key={category.id} style={{ width: '100%' }}>
        <ListItem
          category={category}
          isActive={category.id === selectedId}
          onSelected={onSelected}
        />
      </ScaleFade>
    ))}
  </>
);

export default List;
