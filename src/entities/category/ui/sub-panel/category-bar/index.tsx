import { Button, ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react';

import { Category } from '@entities';
import { ColorCircle, Icon } from '@shared';

interface IProps {
  category: Category;
  onCreated?(): void;
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
}

const CategoryBar: React.FC<IProps> = ({ category, onCreated, onDeleted, onUpdated }) => {
  const onCreatedHandler = () => onCreated && onCreated();
  const onDeletedHandler = () => onDeleted && onDeleted(category.id);
  const onUpdatedHandler = () => onUpdated && onUpdated(category.id);
  return (
    <Flex
      align="center"
      alignItems="center"
      borderBottom={1}
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
      flexWrap={['wrap', 'nowrap']}
      justify={['center', 'space-between']}
      p={2}
    >
      <Flex align="center" flexBasis={['100%', 'auto']} justify={['center', 'normal']} mb={[3, 0]}>
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
      </Flex>
      <ButtonGroup
        display={{ base: 'inline-flex', lg: 'none' }}
        size="sm"
        w={['full', 'initial']}
        isAttached
      >
        <IconButton
          aria-label="Agregar categoria"
          colorScheme="success"
          flex="1"
          icon={<Icon icon="plus" size="sm" />}
          onClick={onCreatedHandler}
        />

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

      <ButtonGroup
        display={{ base: 'none', lg: 'inline-flex' }}
        size="xs"
        w={['full', 'initial']}
        isAttached
      >
        <Button
          aria-label="Agregar categoria"
          colorScheme="success"
          flex="1"
          leftIcon={<Icon icon="plus" size="sm" />}
          onClick={onCreatedHandler}
        >
          Agregar
        </Button>

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
  );
};

export default CategoryBar;
