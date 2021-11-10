import React from 'react';

import { Box, Link } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';
import { ColorCircle } from '@lib/wal-ui';
import { Category } from '@models';

const borderActive = (color: string) => ({
  borderLeft: 3,
  borderLeftColor: color,
  borderLeftStyle: 'solid',
  textDecoration: 'none',
});

const CategoryListItem: React.FC<IProps> = ({ category, isActive, onSelected }) => {
  const activeProps = isActive ? borderActive(category.color) : {};
  return (
    <Box
      {...activeProps}
      _hover={borderActive(category.color)}
      alignItems="center"
      as={Link}
      borderBottom={1}
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
      display="flex"
      onClick={() => onSelected && onSelected(category)}
      px={3}
      py={5}
      transition="border-left 0.3s ease-out"
      w="full"
    >
      <ColorCircle
        border={1}
        borderColor={category.color}
        borderStyle="solid"
        color={category.color}
        ml={1}
        mr={3}
        size="md"
      >
        <Icon icon={category.icon} />
      </ColorCircle>
      {category.name}
    </Box>
  );
};

interface IProps {
  category: Category;
  isActive: boolean;
  onSelected?(category: Category): void;
}

export { CategoryListItem };
