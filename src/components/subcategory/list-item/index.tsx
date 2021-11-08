import React from 'react';

import { Box } from '@chakra-ui/react';

import { Category } from '@models/categories';

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
  subCategory: Category;
  onDeleted?(category: Category): void;
  onEdited?(category: Category): void;
}

export { SubCategoryListItem };
export {};
