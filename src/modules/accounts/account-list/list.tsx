'use client';

import React from 'react';

import { Stack } from '@chakra-ui/react';

import { Account } from '@/models';

import { useAccountSelectAll } from '../query';
import { AccountItem } from './list-item';

export type AccountListProps = {
  data: Account[];
};

const AccountList: React.FC<AccountListProps> = ({ data }) => {
  const { data: accounts } = useAccountSelectAll(data);

  return (
    <Stack direction={['column', 'row']} spacing="5">
      {accounts?.map((account) => (
        <AccountItem key={account.id} account={account} />
      ))}
    </Stack>
  );
};

export { AccountList };
