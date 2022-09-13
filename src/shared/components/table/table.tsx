import { Table as ChakraTable, TableContainer, TableCellProps } from '@chakra-ui/react';
import {
  ColumnDef,
  ColumnSort,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
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
  defaultSort?: ColumnSort;
  emptyText?: string;
  globalFilterEnabled?: boolean;
  isExpandable?: boolean;
  isLoading?: boolean;
  isRowHighlighted?(row: T): boolean;
}

export const Table = <T extends object>({
  columns,
  data = [],
  defaultSort,
  emptyText = es.common.defaultEmptyText,
  globalFilterEnabled = true,
  isExpandable = false,
  isLoading = false,
  isRowHighlighted,
}: IProps<T>): React.ReactElement => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const [sorting, setSorting] = useState<SortingState>(defaultSort ? [defaultSort] : []);
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
    getExpandedRowModel: isExpandable ? getExpandedRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getSubRows: isExpandable ? (row) => (row as { subRows: T[] }).subRows : undefined,
    onExpandedChange: isExpandable ? setExpanded : undefined,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      expanded: isExpandable ? expanded : undefined,
      globalFilter,
      pagination,
      sorting,
    },
  });

  return (
    <>
      {globalFilterEnabled && (
        <GlobalFilter globalFilter={globalFilter} onChangedGlobalFilter={setGlobalFilter} />
      )}
      <TableContainer>
        <ChakraTable bg="white" size="sm" variant="striped">
          <Header headerGroups={getHeaderGroups()} />
          <Body
            emptyText={emptyText}
            isLoading={isLoading}
            isRowHighlighted={isRowHighlighted}
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
