import { Button, Flex, Text } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';
import { ColorCircle } from '@lib/wal-ui';
import { Category } from '@models';

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
      justify="space-between"
      p={2}
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
      <Text>{category.name}</Text>

      <Button
        aria-label="Editar categoria"
        colorScheme="info"
        leftIcon={<Icon icon="plus" size="sm" />}
        ml="auto"
        mr={1}
        onClick={onCreatedHandler}
        size="xs"
      >
        Agregar
      </Button>

      <Button
        aria-label="Editar categoria"
        leftIcon={<Icon icon="edit" size="sm" />}
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
  category: Category;
  onCreated?(): void;
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
}

export { CategoryBar };
