import { Column, Row } from 'react-table';

import { parseJSON } from 'date-fns';

import { DateCell, dateSortType } from '@lib/react-table';
import { TransactionDto } from '@models';

import { AccountableCell, CategoryCell } from './body/cells';

export const columns: Column<TransactionDto>[] = [
  {
    Header: 'Categoria',
    accessor: 'rootCategory',
    Cell: CategoryCell,
    sortType: (rowA: Row<TransactionDto>, rowB: Row<TransactionDto>): number => {
      if (rowA.original.rootCategory > rowB.original.rootCategory) return 1;
      if (rowB.original.rootCategory > rowA.original.rootCategory) return -1;
      if (!rowA.original.subCategory) return -1;
      if (!rowB.original.subCategory) return 1;
      if (rowA.original.subCategory > rowB.original.subCategory) return 1;
      if (rowB.original.subCategory > rowA.original.subCategory) return -1;
      return 0;
    },
  },
  {
    Header: 'Cuenta',
    accessor: 'account',
  },
  {
    Header: 'Fecha',
    Cell: DateCell,
    accessor: 'date',
    sortType: (rowA: Row<TransactionDto>, rowB: Row<TransactionDto>): number =>
      dateSortType(parseJSON(rowA.original.date), parseJSON(rowB.original.date)),
  },
  {
    Header: 'Detalle',
    accessor: 'description',
  },
  {
    Header: 'Importe',
    accessor: 'amount',
    Cell: AccountableCell,
    isNumeric: true,
  },
];
