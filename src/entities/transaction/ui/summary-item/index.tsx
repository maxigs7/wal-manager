import React, { useMemo } from 'react';

import { Stat, StatLabel, StatNumber } from '@chakra-ui/react';

import { formatToCurrency } from '@shared';

interface IProps {
  amount: number;
  label: string;
  useColors?: boolean;
}

const Item: React.FC<IProps> = ({ amount, label, useColors = false }) => {
  const color = useMemo(
    () => (useColors ? (amount > 0 ? 'green.500' : 'red.500') : ''),
    [amount, useColors],
  );
  return (
    <Stat w="full">
      <StatLabel textTransform="uppercase">{label}</StatLabel>
      <StatNumber color={color} textOverflow="ellipsis" whiteSpace="nowrap">
        $ {formatToCurrency(amount)}
      </StatNumber>
    </Stat>
  );
};

export default Item;
