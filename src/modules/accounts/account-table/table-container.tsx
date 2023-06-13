'use client';

import React from 'react';

import { Account } from '@/models';

import { useAccountSelectAll } from '../query';
import { AccountTable } from './table';

export type AccountTableContainerProps = {
  data: Account[];
};

const AccountTableContainer: React.FC<AccountTableContainerProps> = ({ data }) => {
  const { data: accounts, isLoading } = useAccountSelectAll(data);

  return <AccountTable data={accounts || []} isLoading={isLoading} />;
};

export { AccountTableContainer };
