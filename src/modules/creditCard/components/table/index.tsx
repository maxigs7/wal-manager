import React, { useMemo } from 'react';

import { CreditCard } from '@models';
import { Table } from '@shared';

import { getColumns } from './columns';

interface IProps {
  data: CreditCard[];
  isLoading: boolean;
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const CreditCardTable: React.FC<IProps> = ({ data, isLoading, onRemove, onUpdate }) => {
  const columns = useMemo(() => getColumns({ onRemove, onUpdate }), [onRemove, onUpdate]);

  return <Table columns={columns} data={data} isLoading={isLoading} />;
};

export { CreditCardTable };
