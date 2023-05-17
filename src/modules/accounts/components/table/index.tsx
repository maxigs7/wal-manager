'use client';

import React, { useMemo } from 'react';

import { Account } from '@/models';
import { DataTable } from '@/shared/components';

import { getColumns } from './columns';

interface IProps {
  data: Account[];
  isLoading: boolean;
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const AccountTable: React.FC<IProps> = ({ data, isLoading, onRemove, onUpdate }) => {
  const columns = useMemo(() => getColumns({ onRemove, onUpdate }), [onRemove, onUpdate]);

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export { AccountTable };