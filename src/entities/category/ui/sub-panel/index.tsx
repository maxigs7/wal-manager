import { Box, CircularProgress } from '@chakra-ui/react';

import { Category } from '@entities';

import SubCategoryList from '../sub-list';
import EmptyList from '../sub-list-empty';
import NoSelectedList from '../sub-list-no-selected';
import CategoryBar from './category-bar';

interface IProps {
  category?: Category;
  isLoading: boolean;
  onCategoryDeleted?(id: string): void;
  onCategoryUpdated?(id: string): void;
  onCreated?(): void;
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
  subCategories?: Category[];
}

const Panel: React.FC<IProps> = ({
  category,
  isLoading = true,
  onCategoryDeleted,
  onCategoryUpdated,
  onCreated,
  onDeleted,
  onUpdated,
  subCategories = [],
}) => {
  const noSelected = !isLoading && !category;
  const isEmpty = !isLoading && category && !subCategories.length;
  const shouldCenter = isLoading || noSelected || isEmpty;

  return (
    <>
      {category && (
        <CategoryBar
          category={category}
          onCreated={onCreated}
          onDeleted={onCategoryDeleted}
          onUpdated={onCategoryUpdated}
        />
      )}
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        h="full"
        justifyContent={shouldCenter ? 'center' : ''}
        minH="xs"
        w="full"
      >
        {isLoading && <CircularProgress color="crimson.300" isIndeterminate />}
        {noSelected && <NoSelectedList />}
        {isEmpty && <EmptyList onCreated={onCreated} />}
        {!isEmpty && (
          <SubCategoryList
            onDeleted={onDeleted}
            onUpdated={onUpdated}
            parent={category as Category}
            subCategories={subCategories}
          />
        )}
      </Box>
    </>
  );
};

export default Panel;
