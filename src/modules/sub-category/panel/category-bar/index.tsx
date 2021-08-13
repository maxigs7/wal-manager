import { Flex, IconButton, Text } from '@chakra-ui/react';

import { Category } from '@app/api/categories';
import { Icon } from '@lib/chakra-ui';

const CategoryBar: React.FC<IProps> = ({ category, onEdited }) => {
  const onEditedHandler = () => onEdited && onEdited(category);
  return (
    <Flex align="center" borderBottom="1px" borderColor="blackAlpha.500" justify="space-between">
      <Text p={3}>{category.name}</Text>
      <IconButton
        aria-label="Crear categoria"
        icon={<Icon icon="edit" />}
        ml="auto"
        mr="1"
        onClick={onEditedHandler}
        rounded="full"
        size="sm"
      />
    </Flex>
  );
};

interface IProps {
  category: Category;
  onEdited?(category: Category): void;
}

export { CategoryBar };
