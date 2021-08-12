import React from 'react';

import { Box, Link } from '@chakra-ui/react';

import { Category } from '@app/api/categories';

const CategoryListItem: React.FC<Props> = ({ category, isActive, selectedCategory }) => (
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

interface Props {
  category: Category;
  isActive: boolean;
  selectedCategory: (category: Category) => void;
}

// const styles = {
//   listItem: (isActive: boolean) =>
//     classnames(
//       'block p-5 active:bg-primary-700 hover:bg-primary-600 active:text-white hover:text-white',
//       isActive && `bg-primary-600 text-white`,
//     ),
// };

export { CategoryListItem };
