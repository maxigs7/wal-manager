'use client';

import Link from 'next/link';
import React from 'react';

import { Card, useColorModeValue } from '@chakra-ui/react';

import { Account } from '@/models';
import { routes } from '@/routes';

import { AccountTypeIcon } from '../account-type-icon';

export type AccountItemProps = {
  account: Account;
};

const AccountItem: React.FC<AccountItemProps> = ({ account }) => {
  const bg = useColorModeValue('white', 'primary.800');
  return (
    <Card
      alignItems="center"
      as={Link}
      bg={bg}
      display="flex"
      flexDirection="column"
      fontSize="2xl"
      gap="3"
      h="56"
      href={routes.accounts.movements(account.id) as any}
      justifyContent="center"
      maxW="56"
      p="8"
      prefetch={false}
      rounded="lg"
      shadow="md"
      w="full"
    >
      <AccountTypeIcon boxSize="12" type={account.type} />
      <p>{account.name}</p>
    </Card>
  );
};

export { AccountItem };
