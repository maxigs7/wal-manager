import { Box } from '@chakra-ui/react';

import { Category, CategoryType } from '@models';
import { ContentLoader } from '@shared';

import CategoryRootList from '../root-list';
import CategoryRootListEmpty from '../root-list-empty';
import { ActionBar } from './action-bar';

export interface IProps {
  categories?: Category[];
  isLoading: boolean;
  onCreated?(): void;
  onSelected?(category: Category): void;
  onSelectedType?(type: CategoryType): void;
  selectedId?: string;
  selectedType: CategoryType;
}

const Panel: React.FC<IProps> = ({
  categories = [],
  isLoading = true,
  onCreated,
  onSelected,
  onSelectedType,
  selectedId,
  selectedType,
}) => {
  const isEmpty = !isLoading && !categories?.length;
  const hasData = !isLoading && !!categories?.length;

  return (
    <>
      <ActionBar onSelected={onSelectedType} selectedType={selectedType} />

      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent={isLoading || !categories?.length ? 'center' : ''}
        minH="xs"
        p={isLoading ? '4' : ''}
        w="full"
      >
        {isLoading && <ContentLoader />}
        {isEmpty && <CategoryRootListEmpty onCreated={onCreated} type={selectedType} />}
        {hasData && (
          <CategoryRootList
            categories={categories}
            onSelected={onSelected}
            selectedId={selectedId}
          />
        )}
      </Box>
    </>
  );
};

export default Panel;
