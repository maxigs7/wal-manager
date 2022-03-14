import React from 'react';

import { Button, ButtonGroup, Fade, Flex, IconButton, Text } from '@chakra-ui/react';

import { Category } from '@models';
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
        <Fade in={isSelected}>
          <ButtonGroup
            display={{ base: 'inline-flex', lg: 'none' }}
            size="sm"
            w={['full', 'initial']}
            isAttached
          >
            <IconButton
              aria-label="Editar categoria"
              colorScheme="info"
              flex="1"
              icon={<Icon icon="edit" size="sm" />}
              onClick={onUpdatedHandler}
            />

            <IconButton
              aria-label="Eliminar categoria"
              colorScheme="danger"
              flex="1"
              icon={<Icon icon="trash-alt" size="sm" />}
              onClick={onDeletedHandler}
            />
          </ButtonGroup>
        </Fade>

        <ButtonGroup
          display={{ base: 'none', lg: 'inline-flex' }}
          size="xs"
          w={['full', 'initial']}
          isAttached
        >
          <Button
            aria-label="Editar categoria"
            colorScheme="info"
            flex="1"
            leftIcon={<Icon icon="edit" size="sm" />}
            onClick={onUpdatedHandler}
          >
            Editar
          </Button>

          <Button
            aria-label="Eliminar categoria"
            colorScheme="danger"
            flex="1"
            leftIcon={<Icon icon="trash-alt" size="sm" />}
            onClick={onDeletedHandler}
          >
            Eliminar
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};

export default ListItem;
