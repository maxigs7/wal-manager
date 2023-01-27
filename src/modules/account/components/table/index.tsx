import React, { useMemo } from 'react';


import { Account } from '@/models';
import { Table } from '@/shared';

import { getColumns } from './columns';

interface IProps {
  data: Account[];
  isLoading: boolean;
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const AccountTable: React.FC<IProps> = ({ data, isLoading, onRemove, onUpdate }) => {
  const columns = useMemo(() => getColumns({ onRemove, onUpdate }), [onRemove, onUpdate]);

  return <Table columns={columns} data={data} isLoading={isLoading} />;
};

export { AccountTable };
