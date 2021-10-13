import React from 'react';

import { VStack, Text } from '@chakra-ui/react';

import { CreditCard } from '@app/models/credit-cards';
import { Card } from '@lib/wal-ui';

import { CreditCardTypeIcon } from '../type-icon';

const active = {
  bg: 'crimson.500',
  color: 'gray.200',
};

const CreditCardListItem: React.FC<IProps> = ({ cc, isActive, onSelected }) => (
  <Card
    {...(isActive ? active : {})}
    _hover={{
      ...active,
      cursor: 'pointer',
    }}
    h={64}
    onClick={() => onSelected && onSelected(cc)}
    p={5}
    w={64}
  >
    <VStack h="full" justify="center" w="full">
      <CreditCardTypeIcon type={cc.type} width={100} />
      <Text textTransform="uppercase">{cc.name}</Text>
    </VStack>
  </Card>
);

interface IProps {
  cc: CreditCard;
  isActive: boolean;
  onSelected?(cc: CreditCard): void;
}

export { CreditCardListItem };
