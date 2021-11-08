import React from 'react';

import { Box, Link } from '@chakra-ui/react';

import { Category } from '@models/categories';

const CategoryListItem: React.FC<IProps> = ({ category, isActive, onSelected }) => (
  <Box
    _hover={{
      bg: 'crimson.500',
      color: 'white',
      textDecoration: 'none',
    }}
    as={Link}
    bg={isActive ? 'crimson.500' : ''}
    color={isActive ? 'white' : ''}
    display="block"
    onClick={() => onSelected && onSelected(category)}
    p={5}
    w="full"
  >
    {category.name}
  </Box>
);

interface IProps {
  category: Category;
  isActive: boolean;
  onSelected?(category: Category): void;
}

export { CategoryListItem };
