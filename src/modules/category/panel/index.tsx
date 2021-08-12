import { Box, CircularProgress } from '@chakra-ui/react';

import { CategoryType } from '@app/api/common';

import { ActionBar } from './action-bar';

const CategoryPanel: React.FC<IProps> = ({
  children,
  categoryTypeSelected,
  isLoading = true,
  onCategoryTypeSelected,
  onCreated,
}) => {
  return (
    <>
      <ActionBar
        onCreated={onCreated}
        onSelected={onCategoryTypeSelected}
        selectedType={categoryTypeSelected}
      />
      <Box
        align="center"
        display="flex"
        flexDirection="column"
        justify="center"
        minH={isLoading ? 'xs' : ''}
        p={isLoading ? '4' : ''}
        w="full"
      >
        {isLoading && <CircularProgress color="blue.300" isIndeterminate />}
        {!isLoading && children}
      </Box>
    </>
  );
};

interface IProps {
  categoryTypeSelected: CategoryType;
  isLoading: boolean;
  onCategoryTypeSelected: (type: CategoryType) => void;
  onCreated: () => void;
}

export { CategoryPanel };
