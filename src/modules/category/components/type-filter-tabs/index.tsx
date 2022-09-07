import { Flex, FlexProps } from '@chakra-ui/react';
import { useMemo } from 'react';

import { CategoryType, DEFAULT_CATEGORY_TYPE } from '@models';

import { TabButton } from './tab-button';

interface IButton {
  color: string;
  label: string;
  type: CategoryType;
}

interface IProps extends FlexProps {
  onSelected?(type: CategoryType): void;
  selectedType?: CategoryType;
}

const CategoryTypeTabs: React.FC<IProps> = ({
  onSelected,
  selectedType = DEFAULT_CATEGORY_TYPE,
  ...flexProps
}) => {
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
      {...flexProps}
    >
      {buttons.map((item) => (
        <TabButton
          key={item.type}
          color={item.color}
          isSelected={selectedType === item.type}
          onSelected={onSelected}
          type={item.type}
        >
          {item.label}
        </TabButton>
      ))}
    </Flex>
  );
};

export { CategoryTypeTabs };
