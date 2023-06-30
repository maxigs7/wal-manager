'use client';

import React, { useMemo } from 'react';

import { DataTable } from '@/m/shared/data-table/table';

import { CategoryRow } from '../models';
import { GetColumnsTypeParams, getColumns } from './columns';

type Props = {
  data: CategoryRow[];
  isLoading: boolean;
} & GetColumnsTypeParams;

const CategoryTable: React.FC<Props> = ({ data, isLoading, onRemove, onUpdate, onAdd, onMove }) => {
  const columns = useMemo(
    () => getColumns({ onRemove, onUpdate, onAdd, onMove }),
    [onRemove, onUpdate, onAdd, onMove],
  );

  return <DataTable columns={columns} data={data} isExpandable={true} isLoading={isLoading} />;
};

export { CategoryTable };
