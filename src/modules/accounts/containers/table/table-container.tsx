'use client';

import React from 'react';

import { Account } from '@/models';

import { AccountTableContainerProps } from '.';
import { AccountTable } from '../../components/table';
import { useAccountSelectAll } from '../../hooks';

type TableProps = AccountTableContainerProps & { data: Account[] };

const Table: React.FC<TableProps> = ({ data, ...props }) => {
  const { data: accounts, isLoading } = useAccountSelectAll(data);

  return <AccountTable data={accounts || []} isLoading={isLoading} {...props} />;
};

export { Table };
