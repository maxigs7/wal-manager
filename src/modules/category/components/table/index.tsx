import React, { useMemo } from 'react';
import { useExpanded, useSortBy, useTable } from 'react-table';

import { Box, BoxProps, Table } from '@chakra-ui/react';

import { CategoryRow } from '@models';
import { TableBody, TableHeader } from '@shared';

import { Actions } from './cells';
import { getColumns } from './columns';

type Props = BoxProps &
  Actions & {
    data: CategoryRow[];
  };

const CategoryTable: React.FC<Props> = ({
  data,
  onRemove,
  onSubCreate,
  onSubMove,
  onSubRemove,
  onSubUpdate,
  onUpdate,
  ...props
}) => {
  const columns = useMemo(
    () => getColumns({ onRemove, onSubCreate, onSubMove, onSubRemove, onSubUpdate, onUpdate }),
    [onRemove, onSubRemove, onSubUpdate, onUpdate],
  );
  const tableInstance = useTable<CategoryRow>(
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
    useExpanded,
  );

  const { getTableProps } = tableInstance;

  return (
    <Box overflowX="auto" overflowY="hidden" {...props}>
      <Table {...getTableProps()} h="full" size="sm">
        <TableHeader {...tableInstance} />
        <TableBody {...tableInstance} emptyText="No existen categorias..." />
      </Table>
    </Box>
  );
};

export default CategoryTable;
