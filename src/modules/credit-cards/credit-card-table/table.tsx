'use client';

import React, { useMemo } from 'react';

import { DataTable } from '@/m/shared/data-table/table';
import { CreditCard } from '@/models';

import { getColumns } from './columns';

type Props = {
  data: CreditCard[];
  isLoading: boolean;
  onRemove: (creditCard: CreditCard) => void;
};

const CreditCardTable: React.FC<Props> = ({ data, isLoading, onRemove }) => {
  const columns = useMemo(() => getColumns({ onRemove }), [onRemove]);

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export { CreditCardTable };
