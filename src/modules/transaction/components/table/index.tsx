import { TableCellProps, TableRowProps } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';

import { IDolarsi } from '@api';
import { TransactionDto, TransactionType } from '@models';
import { Table } from '@shared';

import { getColumns } from './columns';

interface IProps {
  data: TransactionDto[];
  highlightType?: TransactionType;
  isLoading: boolean;
  onRemove(id: string): void;
  onUpdate(id: string): void;
  quotation?: IDolarsi;
}

const TransactionTable: React.FC<IProps> = ({
  data,
  highlightType,
  isLoading,
  onRemove,
  onUpdate,
  quotation,
}) => {
  const columns = useMemo(
    () => getColumns({ onRemove, onUpdate, quotation }),
    [onRemove, onUpdate, quotation],
  );

  const isRowHighlighted = useCallback(
    (t: TransactionDto) => !!highlightType && t.type !== highlightType,
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

export { TransactionTable };
