'use client';

import { useState } from 'react';

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
  Table,
  useReactTable,
} from '@tanstack/react-table';

import { DEFAULT_PAGE_SIZE, PageSizeType } from './util';

export type UseDataTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  data?: T[];
  defaultSort?: ColumnSort;
  defaultPageSize?: PageSizeType;
  isExpandable?: boolean;
};

export const useDataTable = <T extends object>({
  columns,
  data = [],
  defaultSort,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  isExpandable = false,
}: UseDataTableProps<T>): Table<T> => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [sorting, setSorting] = useState<SortingState>(defaultSort ? [defaultSort] : []);
  const [globalFilter, setGlobalFilter] = useState('');

  const reactTable = useReactTable<T>({
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

  return reactTable;
};
