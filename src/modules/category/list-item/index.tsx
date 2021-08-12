import React from 'react';

import { Box, Link } from '@chakra-ui/react';

import { Category } from '@app/api/categories';

const CategoryListItem: React.FC<IProps> = ({ category, isActive, selectedCategory }) => (
  <Box
    _hover={{
      bg: 'blue.600',
      color: 'white',
      textDecoration: 'none',
    }}
    as={Link}
    bg={isActive ? 'blue.600' : ''}
    color={isActive ? 'white' : ''}
    display="block"
    onClick={() => selectedCategory(category)}
    p={5}
    w="full"
  >
    {category.name}
  </Box>
);

interface IProps {
  category: Category;
  isActive: boolean;
  selectedCategory: (category: Category) => void;
}

export { CategoryListItem };
