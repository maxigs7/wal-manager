import React from 'react';

import { Flex } from '@chakra-ui/react';
import { es } from 'date-fns/locale';

import MonthButton from './button';

interface IProps {
  currentMonth: number;
  onUpdateMonth(index: number): void;
}

const months = [...Array(12)].map((_v, index) =>
  es.localize?.month(index, { width: 'abbreviated' }),
);

const MonthsTab: React.FC<IProps> = ({ currentMonth, onUpdateMonth }) => {
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
        <MonthButton
          index={index}
          isActive={currentMonth === index}
          key={month}
          month={month}
          onUpdateMonth={onUpdateMonth}
        />
      ))}
    </Flex>
  );
};

export default React.memo(MonthsTab);
