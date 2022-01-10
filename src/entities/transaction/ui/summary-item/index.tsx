import React from 'react';

import { Text, Flex } from '@chakra-ui/react';

import { formatToCurrency } from '@shared';

interface IProps {
  amount: number;
  label: string;
}

const Item: React.FC<IProps> = ({ amount, label }) => (
  <Flex as={Text} w={['full', 'auto']}>
    <Text as="strong" textTransform="uppercase">
      {label}:
    </Text>
    <Text as="span" ml={['auto', '5']} mr={['10', 0]} whiteSpace="nowrap">
      $ {formatToCurrency(amount)}
    </Text>
  </Flex>
);

export default Item;
