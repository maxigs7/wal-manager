import { Box, CircularProgress } from '@chakra-ui/react';

import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';

import { CategoryList } from '../list';
import { CategoryListEmpty } from '../list-empty';
import { ActionBar } from './action-bar';

const CategoryPanel: React.FC<IProps> = ({
  categories = [],
  isLoading = true,
  onCreated,
  onSelected,
  onTypeSelected,
  selected,
  selectedType,
}) => {
  return (
    <>
      <ActionBar onCreated={onCreated} onSelected={onTypeSelected} selectedType={selectedType} />
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent={isLoading || !categories?.length ? 'center' : ''}
        minH="xs"
        p={isLoading ? '4' : ''}
        w="full"
      >
        {isLoading && <CircularProgress color="crimson.300" isIndeterminate />}
        {!isLoading && !categories?.length && <CategoryListEmpty onCreated={onCreated} />}
        {!isLoading && !!categories?.length && (
          <CategoryList categories={categories} onSelected={onSelected} selected={selected} />
        )}
      </Box>
    </>
  );
};

interface IProps {
  categories?: Category[];
  isLoading: boolean;
  onCreated?(): void;
  onSelected?(category: Category): void;
  onTypeSelected?(type: CategoryType): void;
  selected?: Category;
  selectedType?: CategoryType;
}

export { CategoryPanel };
export type CategoryPanelProps = IProps;
