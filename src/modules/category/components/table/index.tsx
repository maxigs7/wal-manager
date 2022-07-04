import React, { useMemo } from 'react';
import { useExpanded, useSortBy, useTable } from 'react-table';

import { Box, BoxProps, Table } from '@chakra-ui/react';

import { CategoryRow } from '@models';
import { TableBody, TableHeader } from '@shared';

import { getColumns } from './columns';

interface IProps extends BoxProps {
  data: CategoryRow[];
  onRemove(id: string): void;
  onSubCreate(parentId: string): void;
  onSubRemove(parentId: string, id: string): void;
  onSubUpdate(parentId: string, id: string): void;
  onUpdate(id: string): void;
}

const CategoryTable: React.FC<IProps> = ({
  data,
  onRemove,
  onSubCreate,
  onSubRemove,
  onSubUpdate,
  onUpdate,
  ...props
}) => {
  const columns = useMemo(
    () => getColumns({ onRemove, onSubCreate, onSubRemove, onSubUpdate, onUpdate }),
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
