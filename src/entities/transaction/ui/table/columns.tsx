import { Column, Row } from 'react-table';

import { TransactionDto } from '@entities';
import { DateCell, dateSortType } from '@shared';

import { AccountableCell, AccountCell, ActionsCell, CategoryCell, DescriptionCell } from './cells';

interface IProps {
  onMoreActions(id: string): void;
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

type GetColumnsType = (props: IProps) => Column<TransactionDto>[];

export const getColumns: GetColumnsType = ({ onMoreActions, onRemove, onUpdate }) => [
  {
    accessor: 'id',
    Cell: (props) => (
      <ActionsCell
        {...props}
        onMoreActions={onMoreActions}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ),
    Header: '...',
  },
  {
    accessor: 'rootCategory',
    Cell: CategoryCell,
    Header: 'Categoria',
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
    accessor: 'account',
    Cell: AccountCell,
    Header: 'Cuenta',
  },
  {
    accessor: 'date',
    Cell: DateCell,
    Header: 'Fecha',
    sortType: (rowA: Row<TransactionDto>, rowB: Row<TransactionDto>): number =>
      dateSortType(rowA.original.date, rowB.original.date),
  },
  {
    accessor: 'description',
    Cell: DescriptionCell,
    Header: 'Detalle',
  },
  {
    accessor: 'amount',
    Cell: AccountableCell,
    Header: 'Importe',
    isNumeric: true,
  },
];
