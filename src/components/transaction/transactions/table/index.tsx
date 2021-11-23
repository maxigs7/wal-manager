import React from 'react';
import { useSortBy, useTable } from 'react-table';

import { Box, Table } from '@chakra-ui/react';

import { TransactionDto } from '@models';

import { Body } from './body';
import { columns } from './columns';
import { Header } from './header';

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
        <Header {...tableInstance} />
        <Body {...tableInstance} />
      </Table>
    </Box>
  );
};

interface IProps {
  data: TransactionDto[];
}

export { TransactionTable };
