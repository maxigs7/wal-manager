import { useMemo } from 'react';

import { Flex } from '@chakra-ui/react';

import { CategoryType, DEFAULT_CATEGORY_TYPE } from '@models';

import { TabButton } from './tab-button';

interface IButton {
  color: string;
  label: string;
  type: CategoryType;
}

const ActionBar: React.FC<IProps> = ({ onSelected, selectedType = DEFAULT_CATEGORY_TYPE }) => {
  const buttons: IButton[] = useMemo(
    () => [
      {
        color: 'red.400',
        label: 'Gastos',
        type: 'expenses',
      },
      {
        color: 'green.400',
        label: 'Ingresos',
        type: 'incomes',
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
