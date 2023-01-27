import React, { useCallback, useMemo } from 'react';


import { IDolarsi } from '@/api';
import { GetMovementItem, MovementType } from '@/models';
import { Table } from '@/shared';

import { getColumns } from './columns';

interface IProps {
  data: GetMovementItem[];
  highlightType?: MovementType;
  isLoading: boolean;
  onRemove(id: string): void;
  onUpdate(id: string): void;
  onUpdateIsPaid(id: string, checked: boolean): void;
  quotation?: IDolarsi;
}

const MovementTable: React.FC<IProps> = ({
  data,
  highlightType,
  isLoading,
  onRemove,
  onUpdate,
  onUpdateIsPaid,
  quotation,
}) => {
  const columns = useMemo(
    () => getColumns({ onRemove, onUpdate, onUpdateIsPaid, quotation }),
    [onRemove, onUpdate, onUpdateIsPaid, quotation],
  );

  const isRowHighlighted = useCallback(
    (t: GetMovementItem) => !!highlightType && t.type !== highlightType,
    [highlightType],
  );

  return (
    <Table
      columns={columns}
      data={data}
      defaultSort={{ id: 'date', desc: false }}
      globalFilterEnabled={false}
      isLoading={isLoading}
      isRowHighlighted={isRowHighlighted}
    />
  );
};

export { MovementTable };
