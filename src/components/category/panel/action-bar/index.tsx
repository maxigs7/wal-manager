import { Flex, IconButton } from '@chakra-ui/react';

import { CategoryType } from '@app/api/common';
import { Icon } from '@lib/chakra-ui';

import { TabButton } from './tab-button';

const buttons = [
  {
    label: 'Gastos',
    type: CategoryType.Expense,
  },
  {
    label: 'Ingresos',
    type: CategoryType.Income,
  },
];

const ActionBar: React.FC<IProps> = ({
  onCreated,
  onSelected,
  selectedType = CategoryType.Expense,
}) => {
  const onCreatedHandler = () => onCreated && onCreated();
  return (
    <Flex align="center" borderBottom="1px" borderColor="blackAlpha.500" justify="space-between">
      {buttons.map((item) => (
        <TabButton
          isSelected={selectedType === item.type}
          key={item.type}
          onSelected={onSelected}
          type={item.type}
        >
          {item.label}
        </TabButton>
      ))}

      <IconButton
        aria-label="Crear categoria"
        colorScheme="crimson"
        icon={<Icon icon="plus" />}
        ml="auto"
        mr="1"
        onClick={onCreatedHandler}
        rounded="full"
        size="sm"
      />
    </Flex>
  );
};

interface IProps {
  onCreated?(): void;
  onSelected?(type: CategoryType): void;
  selectedType?: CategoryType;
}

export { ActionBar };
