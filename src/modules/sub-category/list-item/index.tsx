import React from 'react';

import { Box } from '@chakra-ui/react';

import { SubCategory } from '@app/api/categories';

const SubCategoryListItem: React.FC<IProps> = ({ subCategory }) => (
  <Box
    _hover={{
      bg: 'blue.600',
      color: 'white',
      textDecoration: 'none',
    }}
    p={5}
    w="full"
  >
    {subCategory.name}
  </Box>
);

interface IProps {
  subCategory: SubCategory;
  onDeleted?(category: SubCategory): void;
  onEdited?(category: SubCategory): void;
}

export { SubCategoryListItem };
