import React from 'react';

import { Box, Link, Text } from '@chakra-ui/react';

import { Category } from '@entities';
import { ColorCircle, Icon } from '@shared';

interface IProps {
  category: Category;
  isActive: boolean;
  onSelected?(category: Category): void;
}

const borderActive = (color: string) => ({
  borderLeft: 3,
  borderLeftColor: color,
  borderLeftStyle: 'solid',
  textDecoration: 'none',
});

const ListItem: React.FC<IProps> = ({ category, isActive, onSelected }) => {
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
      height="16"
      onClick={() => onSelected && onSelected(category)}
      px={3}
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
      <Text isTruncated>{category.name}</Text>
    </Box>
  );
};

export default ListItem;
