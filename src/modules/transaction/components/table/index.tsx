import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

import { Box, Table } from '@chakra-ui/react';

import { TransactionDto, TransactionType } from '@models';
import { TableBody, TableHeader } from '@shared';

import { getColumns } from './columns';

interface IProps {
  data: TransactionDto[];
  highlightType?: TransactionType;
  onMoreActions(id: string): void;
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const TransactionTable: React.FC<IProps> = ({
  data,
  highlightType,
  onMoreActions,
  onRemove,
  onUpdate,
}) => {
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
        <TableBody
          {...tableInstance}
          emptyText="No existen movimientos..."
          getRowProps={(row) => ({
            key: row.original.id,
            style: {
              opacity: highlightType && row.original.type !== highlightType ? '0.5' : '1',
            },
          })}
        />
      </Table>
    </Box>
  );
};

export default TransactionTable;
