import { CellProps, Column, Row } from 'react-table';

import { format, parseJSON } from 'date-fns';

import { CategoryInline } from '@components';
import { dateSortType } from '@lib/react-table';
import { TransactionDto } from '@models';

export const columns: Column<TransactionDto>[] = [
  {
    Header: 'Categoria',
    accessor: 'rootCategory',
    Cell: (props: CellProps<TransactionDto, string>) =>
      props.row.original.id && (
        <CategoryInline
          color={props.row.original.rootCategoryColor}
          icon={props.row.original.rootCategoryIcon}
          name={props.row.original.rootCategory}
          subName={props.row.original.subCategory}
        />
      ),
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
    Cell: (props: CellProps<TransactionDto, string>) =>
      format(parseJSON(props.cell.value), 'dd/MM/yyyy'),
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
    Cell: (props: CellProps<TransactionDto, number>) => props.cell.value?.toLocaleString('es-AR'),
    isNumeric: true,
  },
];
