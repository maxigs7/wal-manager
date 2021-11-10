import { Flex, FlexProps } from '@chakra-ui/react';

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

const ActionBar: React.FC<IProps> = ({
  onSelected,
  selectedType = CategoryType.Expense,
  ...flexProps
}) => {
  return (
    <Flex
      align="center"
      {...flexProps}
      borderBottom={1}
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
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

interface IProps extends FlexProps {
  onCreated?(): void;
  onSelected?(type: CategoryType): void;
  selectedType?: CategoryType;
}

export { ActionBar };
