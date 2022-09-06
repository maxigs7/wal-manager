import { Table as ChakraTable, TableContainer } from '@chakra-ui/react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { es } from '@i18n';

import Body from './body';
import GlobalFilter from './global-filter';
import Header from './header';
import { Paginator } from './paginator';

interface IProps<T extends object> {
  columns: ColumnDef<T>[];
  data?: T[];
  defaultPageSize?: number;
  emptyText?: string;
  globalFilter?: string;
  isLoading?: boolean;
  onChangedGlobalFilter?(value: string): void;
}

export const Table = <T extends object>({
  columns,
  data = [],
  emptyText = es.common.defaultEmptyText,
  isLoading = false,
  onChangedGlobalFilter,
}: IProps<T>): React.ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const {
    getCanNextPage,
    getCanPreviousPage,
    getHeaderGroups,
    getPageCount,
    getRowModel,
    getState,
    getVisibleFlatColumns,
    nextPage,
    previousPage,
    setPageIndex,
    setPageSize,
  } = useReactTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      sorting,
    },
  });

  return (
    <>
      <GlobalFilter globalFilter={globalFilter} onChangedGlobalFilter={setGlobalFilter} />
      <TableContainer>
        <ChakraTable bg="white" size="sm" variant="striped">
          <Header headerGroups={getHeaderGroups()} />
          <Body
            emptyText={emptyText}
            isLoading={isLoading}
            model={getRowModel()}
            numberOfColumns={getVisibleFlatColumns().length}
          />
          <Paginator
            canNextPage={getCanNextPage()}
            canPreviousPage={getCanPreviousPage()}
            nextPage={nextPage}
            numberOfColumns={getVisibleFlatColumns().length}
            numberOfRows={getRowModel().rows.length}
            pageCount={getPageCount()}
            pageIndex={getState().pagination.pageIndex}
            pageSize={getState().pagination.pageSize}
            previousPage={previousPage}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </ChakraTable>
      </TableContainer>
    </>
  );
};
