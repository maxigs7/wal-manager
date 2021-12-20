import { Column, Row } from 'react-table';

import { TransactionDto } from '@entities';
import { DateCell, dateSortType } from '@shared';

import { AccountableCell, AccountCell, ActionsCell, CategoryCell, DescriptionCell } from './cells';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

type GetColumnsType = (props: IProps) => Column<TransactionDto>[];

export const getColumns: GetColumnsType = ({ onRemove, onUpdate }) => [
  {
    Header: '...',
    accessor: 'id',
    Cell: (props) => <ActionsCell {...props} onRemove={onRemove} onUpdate={onUpdate} />,
  },
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
    Cell: AccountCell,
  },
  {
    Header: 'Fecha',
    Cell: DateCell,
    accessor: 'date',
    sortType: (rowA: Row<TransactionDto>, rowB: Row<TransactionDto>): number =>
      dateSortType(rowA.original.date, rowB.original.date),
  },
  {
    Header: 'Detalle',
    accessor: 'description',
    Cell: DescriptionCell,
  },
  {
    Header: 'Importe',
    accessor: 'amount',
    Cell: AccountableCell,
    isNumeric: true,
  },
];
