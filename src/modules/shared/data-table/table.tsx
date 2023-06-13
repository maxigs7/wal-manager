'use client';

import { Table as ChakraTable, TableContainer } from '@chakra-ui/react';

import { es } from '@/i18n';

import Body from './body';
import GlobalFilter from './global-filter';
import Header from './header';
import { Paginator } from './paginator';
import { useDataTable, UseDataTableProps } from './useDataTable';

type Props<T extends object> = UseDataTableProps<T> & {
  emptyText?: string;
  globalFilterEnabled?: boolean;
  isLoading?: boolean;
  isRowHighlighted?(row: T): boolean;
};

export const DataTable = <T extends object>({
  columns,
  data = [],
  defaultSort,
  emptyText = es.common.defaultEmptyText,
  globalFilterEnabled = true,
  isExpandable = false,
  isLoading = false,
  isRowHighlighted,
}: Props<T>): React.ReactElement => {
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
    setGlobalFilter,
  } = useDataTable<T>({
    columns,
    data,
    defaultSort,
    isExpandable,
  });

  return (
    <>
      {globalFilterEnabled && (
        <GlobalFilter
          globalFilter={getState().globalFilter}
          onChangedGlobalFilter={setGlobalFilter}
        />
      )}
      <TableContainer>
        <ChakraTable size="sm">
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
            totalRows={data.length}
          />
        </ChakraTable>
      </TableContainer>
    </>
  );
};
