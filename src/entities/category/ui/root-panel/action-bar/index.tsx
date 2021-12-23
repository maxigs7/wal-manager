import { useMemo } from 'react';

import { Flex } from '@chakra-ui/react';

import { CategoryType } from '@entities';

import { TabButton } from './tab-button';

const ActionBar: React.FC<IProps> = ({ onSelected, selectedType = CategoryType.Expense }) => {
  const buttons = useMemo(
    () => [
      {
        color: 'red.400',
        label: 'Gastos',
        type: CategoryType.Expense,
      },
      {
        color: 'green.400',
        label: 'Ingresos',
        type: CategoryType.Income,
      },
    ],
    [],
  );
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
