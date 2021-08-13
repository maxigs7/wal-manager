import { Box, CircularProgress } from '@chakra-ui/react';

import { CategoryType } from '@app/api/common';

import { ActionBar } from './action-bar';

const CategoryPanel: React.FC<IProps> = ({
  children,
  selectedType,
  isLoading = true,
  onTypeSelected,
  onCreated,
}) => {
  return (
    <>
      <ActionBar onCreated={onCreated} onSelected={onTypeSelected} selectedType={selectedType} />
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
  isLoading: boolean;
  onCreated: () => void;
  onTypeSelected: (type: CategoryType) => void;
  selectedType: CategoryType;
}

export { CategoryPanel };
