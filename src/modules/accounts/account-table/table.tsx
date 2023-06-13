'use client';

import React, { useMemo } from 'react';

import { Account } from '@/models';
import { DataTable } from '@/shared/components';

import { getColumns } from './columns';

type Props = {
  data: Account[];
  isLoading: boolean;
};

const AccountTable: React.FC<Props> = ({ data, isLoading }) => {
  const columns = useMemo(() => getColumns(), []);

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export { AccountTable };
