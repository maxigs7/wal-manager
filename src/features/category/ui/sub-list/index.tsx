import React from 'react';

import { ScaleFade } from '@chakra-ui/react';

import { Category, SubCategoryPanel, useCategorySubList } from '@entities';
import { Card } from '@shared';

interface IProps {
  onCategoryDeleted(id: string): void;
  onCategoryUpdated(id: string): void;
  onCreated(): void;
  onDeleted(id: string): void;
  onUpdated(id: string): void;
  selected?: Category;
}

const List = React.forwardRef<HTMLDivElement, IProps>(
  ({ onCategoryUpdated, onCategoryDeleted, onCreated, onDeleted, onUpdated, selected }, ref) => {
    const { data: categories, isLoading } = useCategorySubList(selected?.id);

    return (
      <ScaleFade in={true} ref={ref}>
        <Card>
          <SubCategoryPanel
            category={selected}
            isLoading={isLoading}
            onCategoryDeleted={onCategoryDeleted}
            onCategoryUpdated={onCategoryUpdated}
            onCreated={onCreated}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
            subCategories={categories}
          />
        </Card>
      </ScaleFade>
    );
  },
);

export default List;
