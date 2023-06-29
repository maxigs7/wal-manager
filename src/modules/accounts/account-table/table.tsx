'use client';

import React, { useMemo } from 'react';

import { DataTable } from '@/m/shared/data-table/table';
import { Account } from '@/models';

import { GetColumnsTypeParams, getColumns } from './columns';

type Props = {
  data: Account[];
  isLoading: boolean;
} & GetColumnsTypeParams;

const AccountTable: React.FC<Props> = ({ data, isLoading, onRemove, onUpdate }) => {
  const columns = useMemo(() => getColumns({ onRemove, onUpdate }), [onRemove, onUpdate]);

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export { AccountTable };
