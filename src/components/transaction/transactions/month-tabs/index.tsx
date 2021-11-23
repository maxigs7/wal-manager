import React from 'react';

import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import { es } from 'date-fns/locale';

const months = [...Array(12)].map((_v, index) =>
  es.localize?.month(index, { width: 'abbreviated' }),
);

const activeStyle = (isSelected: boolean): Partial<ButtonProps> =>
  isSelected
    ? {
        borderBottom: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: 'crimson.500',
      }
    : {};

const MonthsTab: React.FC<IProps> = ({ currentMonth, onTabChange }) => {
  return (
    <Flex
      borderBottom={1}
      borderBottomColor="gray.100"
      borderBottomStyle="solid"
      css={{
        '&::-webkit-scrollbar': {
          height: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--chakra-colors-gray-300)',
        },
      }}
      overflowX="auto"
      overflowY="hidden"
    >
      {months.map((month, index) => (
        <Button
          {...activeStyle(currentMonth === index)}
          _focus={{ outline: 'none' }}
          borderRadius={0}
          flexBasis="100%"
          key={month}
          onClick={() => onTabChange && onTabChange(index)}
          px={10}
          textTransform="uppercase"
          variant="ghost"
        >
          {month}
        </Button>
      ))}
    </Flex>
  );
};

interface IProps {
  currentMonth: number;
  onTabChange?(index: number): void;
}

export { MonthsTab };
