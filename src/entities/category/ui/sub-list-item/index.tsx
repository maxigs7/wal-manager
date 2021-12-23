import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

import { Category } from '@entities';
import { Icon } from '@shared';

interface IProps {
  isSelected?: boolean;
  onDeleted?(id: string): void;
  onSelected?(id: string): void;
  onUpdated?(id: string): void;
  parent: Category;
  subCategory: Category;
}

const borderActive = (color: string) => ({
  borderLeft: 3,
  borderLeftColor: color,
  borderLeftStyle: 'solid',
  textDecoration: 'none',
});

const ListItem: React.FC<IProps> = ({
  isSelected = false,
  onDeleted,
  onSelected,
  onUpdated,
  parent,
  subCategory,
}) => {
  const onDeletedHandler = () => onDeleted && onDeleted(subCategory.id);
  const onSelectedHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSelected && onSelected(subCategory.id);
  };
  const onUpdatedHandler = () => onUpdated && onUpdated(subCategory.id);
  const activeProps = isSelected ? borderActive(parent.color) : {};

  return (
    <Flex
      {...activeProps}
      _hover={borderActive(parent.color)}
      align="center"
      borderBottom={1}
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
      height="16"
      onClick={onSelectedHandler}
      position="relative"
      px={3}
      transition="border-left 0.3s ease-out"
      w="full"
    >
      <Text isTruncated>{subCategory.name}</Text>

      <Flex
        align="center"
        ml="auto"
        mr={[3, 0]}
        position={['absolute', 'static']}
        right={[0, 'auto']}
        visibility={[isSelected ? 'visible' : 'hidden', 'visible']}
      >
        <Button
          aria-label="Editar categoria"
          colorScheme="primary"
          leftIcon={<Icon icon="edit" size="sm" />}
          mr={1}
          onClick={onUpdatedHandler}
          size="xs"
        >
          Editar
        </Button>

        <Button
          aria-label="Eliminar categoria"
          colorScheme="danger"
          leftIcon={<Icon icon="trash-alt" size="sm" />}
          onClick={onDeletedHandler}
          size="xs"
        >
          Eliminar
        </Button>
      </Flex>
    </Flex>
  );
};

export default ListItem;
