import React from 'react';
import { useSortBy, useTable } from 'react-table';

import { Box, Table } from '@chakra-ui/react';

import { TransactionDto } from '@entities';
import { TableBody, TableHeader } from '@shared';

import { columns } from './columns';

interface IProps {
  data: TransactionDto[];
}

const TransactionTable: React.FC<IProps> = ({ data }) => {
  const tableInstance = useTable(
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
