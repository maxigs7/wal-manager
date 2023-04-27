import React from 'react';

import { useUow } from '@/shared/api/server';

import { Table } from './table-container';

export type AccountTableContainerProps = {
  onRemove(id: string): void;
  onUpdate(id: string): void;
};

/* @ts-expect-error Async Server Component */
const AccountTableContainer: React.FC<AccountTableContainerProps> = async (props) => {
  const { account } = useUow();
  const data = await account.select({ order: { field: 'name' } });

  return <Table data={data || []} {...props} />;
};

export { AccountTableContainer };
