import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';
import { Category } from '@models';

const borderActive = (color: string) => ({
  borderLeft: 3,
  borderLeftColor: color,
  borderLeftStyle: 'solid',
  textDecoration: 'none',
});

const SubCategoryListItem: React.FC<IProps> = ({ onUpdated, onDeleted, subCategory }) => {
  const onDeletedHandler = () => onDeleted && onDeleted(subCategory.id);
  const onUpdatedHandler = () => onUpdated && onUpdated(subCategory.id);

  return (
    <Flex
      _hover={borderActive(subCategory.color)}
      align="center"
      borderBottom={1}
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
      height="16"
      px={3}
      transition="border-left 0.3s ease-out"
      w="full"
    >
      <Text isTruncated>{subCategory.name}</Text>

      <Button
        aria-label="Editar categoria"
        leftIcon={<Icon icon="edit" size="sm" />}
        ml="auto"
        mr={1}
        onClick={onUpdatedHandler}
        size="xs"
      >
        Editar
      </Button>

      <Button
        aria-label="Eliminar categoria"
        colorScheme="red"
        leftIcon={<Icon icon="trash-alt" size="sm" />}
        mr={3}
        onClick={onDeletedHandler}
        size="xs"
      >
        Eliminar
      </Button>
    </Flex>
  );
};

interface IProps {
  subCategory: Category;
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
}

export { SubCategoryListItem };
export {};
