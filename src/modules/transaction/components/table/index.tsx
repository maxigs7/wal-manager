import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

import { Box, Table } from '@chakra-ui/react';

import { TransactionDto } from '@models';
import { TableBody, TableHeader } from '@shared';

import { getColumns } from './columns';

interface IProps {
  data: TransactionDto[];
  onMoreActions(id: string): void;
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const TransactionTable: React.FC<IProps> = ({ data, onMoreActions, onRemove, onUpdate }) => {
  const columns = useMemo(
    () => getColumns({ onMoreActions, onRemove, onUpdate }),
    [onMoreActions, onRemove, onUpdate],
  );
  const tableInstance = useTable<TransactionDto>(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'date',
          },
        ],
      },
    },
    useSortBy,
  );

  const { getTableProps } = tableInstance;

  return (
    <Box overflowX="auto" overflowY="hidden">
      <Table {...getTableProps()} size="sm">
        <TableHeader {...tableInstance} />
        <TableBody {...tableInstance} emptyText="No existen movimientos..." />
      </Table>
    </Box>
  );
};

export default TransactionTable;