import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

import { Box, BoxProps, Table } from '@chakra-ui/react';

import { CreditCard } from '@models';
import { TableBody, TableHeader } from '@shared';

import { getColumns } from './columns';

interface IProps extends BoxProps {
  data: CreditCard[];
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

const CreditCardTable: React.FC<IProps> = ({ data, onRemove, onUpdate, ...props }) => {
  const columns = useMemo(() => getColumns({ onRemove, onUpdate }), [onRemove, onUpdate]);
  const tableInstance = useTable<CreditCard>(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'name',
          },
        ],
      },
    },
    useSortBy,
  );

  const { getTableProps } = tableInstance;

  return (
    <Box overflowX="auto" overflowY="hidden" {...props}>
      <Table {...getTableProps()} h="full" size="sm">
        <TableHeader {...tableInstance} />
        <TableBody {...tableInstance} emptyText="No existen cuentas..." />
      </Table>
    </Box>
  );
};

export default CreditCardTable;
