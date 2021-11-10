import { Flex } from '@chakra-ui/react';

import { CategoryType } from '@models';

import { TabButton } from './tab-button';

const buttons = [
  {
    color: 'red.500',
    label: 'Gastos',
    type: CategoryType.Expense,
  },
  {
    color: 'green.500',
    label: 'Ingresos',
    type: CategoryType.Income,
  },
];

const ActionBar: React.FC<IProps> = ({ onSelected, selectedType = CategoryType.Expense }) => {
  return (
    <Flex
      align="center"
      borderBottom={1}
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
      justifyContent={['center', 'flex-start']}
    >
      {buttons.map((item) => (
        <TabButton
          color={item.color}
          isSelected={selectedType === item.type}
          key={item.type}
          onSelected={onSelected}
          type={item.type}
        >
          {item.label}
        </TabButton>
      ))}
    </Flex>
  );
};

interface IProps {
  onCreated?(): void;
  onSelected?(type: CategoryType): void;
  selectedType?: CategoryType;
}

export { ActionBar };
