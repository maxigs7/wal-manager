import { ScaleFade } from '@chakra-ui/react';

import { Category, CategoryRootPanel, CategoryType, useCategoryRootList } from '@entities';
import { Card } from '@shared';

interface IProps {
  onCreated(): void;
  onSelected?(category: Category): void;
  onSelectedType(type: CategoryType): void;
  selectedId?: string;
  type: CategoryType;
}

const List: React.FC<IProps> = ({ onCreated, onSelected, onSelectedType, selectedId, type }) => {
  const { data: categories, isLoading } = useCategoryRootList(type);

  return (
    <ScaleFade in={true}>
      <Card>
        <CategoryRootPanel
          categories={categories}
          isLoading={isLoading}
          onCreated={onCreated}
          onSelected={onSelected}
          onSelectedType={onSelectedType}
          selectedId={selectedId}
          selectedType={type}
        />
      </Card>
    </ScaleFade>
  );
};

export default List;
