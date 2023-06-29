'use client';

import React, { useMemo } from 'react';

import { DataTable } from '@/m/shared/data-table/table';
import { CreditCard } from '@/models';

import { GetColumnsTypeParams, getColumns } from './columns';

type Props = {
  data: CreditCard[];
  isLoading: boolean;
} & GetColumnsTypeParams;

const CreditCardTable: React.FC<Props> = ({ data, isLoading, onRemove, onUpdate }) => {
  const columns = useMemo(() => getColumns({ onRemove, onUpdate }), [onRemove, onUpdate]);

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export { CreditCardTable };
