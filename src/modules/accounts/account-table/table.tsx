'use client';

import React, { useMemo } from 'react';

import { DataTable } from '@/m/shared/data-table/table';
import { Account } from '@/models';

import { getColumns } from './columns';

type Props = {
  data: Account[];
  isLoading: boolean;
  onRemove: (account: Account) => void;
};

const AccountTable: React.FC<Props> = ({ data, isLoading, onRemove }) => {
  const columns = useMemo(() => getColumns({ onRemove }), [onRemove]);

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export { AccountTable };
