import React from 'react';

import { VStack, Text } from '@chakra-ui/react';

import { Account } from '@app/models/accounts';
import { Card } from '@lib/wal-ui';

import { AccountTypeIcon } from '../type-icon';

const active = {
  bg: 'crimson.500',
  color: 'gray.200',
};

const AccountListItem: React.FC<IProps> = ({ account, isActive, onSelected }) => (
  <Card
    {...(isActive ? active : {})}
    _hover={{
      ...active,
      cursor: 'pointer',
    }}
    h={64}
    mb={5}
    mr={5}
    onClick={() => onSelected && onSelected(account)}
    p={5}
    w={64}
  >
    <VStack h="full" justify="center" w="full">
      <AccountTypeIcon size="5x" type={account.accountType} />
      <Text textTransform="uppercase">{account.name}</Text>
    </VStack>
  </Card>
);

interface IProps {
  account: Account;
  isActive: boolean;
  onSelected?(account: Account): void;
}

export { AccountListItem };
