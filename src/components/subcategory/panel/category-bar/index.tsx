import { Flex, IconButton, Text } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';
import { ColorCircle } from '@lib/wal-ui';
import { Category } from '@models/categories';

const CategoryBar: React.FC<IProps> = ({ category, onDeleted, onUpdated }) => {
  const onDeletedHandler = () => onDeleted && onDeleted(category.id);
  const onUpdatedHandler = () => onUpdated && onUpdated(category.id);
  return (
    <Flex
      align="center"
      alignItems="center"
      borderBottom="1px"
      borderColor="blackAlpha.500"
      justify="space-between"
      p={2}
    >
      <ColorCircle bg={category.color} color="white" ml={1} mr={3} size="md">
        <Icon icon={category.icon} />
      </ColorCircle>
      <Text>{category.name}</Text>
      <IconButton
        aria-label="Eliminar categoria"
        colorScheme="crimson"
        icon={<Icon icon="trash-alt" />}
        ml="auto"
        mr="1"
        onClick={onDeletedHandler}
        rounded="full"
        size="sm"
      />
      <IconButton
        aria-label="Editar categoria"
        icon={<Icon icon="edit" />}
        mr="1"
        onClick={onUpdatedHandler}
        rounded="full"
        size="sm"
      />
    </Flex>
  );
};

interface IProps {
  category: Category;
  onDeleted?(id: string): void;
  onUpdated?(id: string): void;
}

export { CategoryBar };
