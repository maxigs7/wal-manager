import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { IDolarsi } from '@api';
import { es } from '@i18n';
import { TransactionDto } from '@models';
import { DateCell } from '@shared';
import { ActionButton, ActionsCell } from '@shared';

import { AccountableCell, CategoryCell, CreditCardCell, DescriptionCell } from './cells';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
  quotation?: IDolarsi;
}

type GetColumnsType = (props: IProps) => ColumnDef<TransactionDto, any>[];

const columnHelper = createColumnHelper<TransactionDto>();

export const getColumns: GetColumnsType = ({ onRemove, onUpdate, quotation }) => [
  // Accessor Column
  columnHelper.accessor('rootCategory', {
    cell: CategoryCell,
    header: es.transaction.headers.category,
    // sortType: (rowA: Row<TransactionDto>, rowB: Row<TransactionDto>): number => {
    //   if (rowA.original.rootCategory > rowB.original.rootCategory) return 1;
    //   if (rowB.original.rootCategory > rowA.original.rootCategory) return -1;
    //   if (!rowA.original.subCategory) return -1;
    //   if (!rowB.original.subCategory) return 1;
    //   if (rowA.original.subCategory > rowB.original.subCategory) return 1;
    //   if (rowB.original.subCategory > rowA.original.subCategory) return -1;
    //   return 0;
    // },
  }),
  columnHelper.accessor('date', {
    header: es.transaction.headers.date,
    cell: DateCell,
    // sortType: (rowA: Row<TransactionDto>, rowB: Row<TransactionDto>): number =>
    //   dateSortType(rowA.original.date, rowB.original.date),
  }),
  columnHelper.accessor('creditCard', {
    cell: CreditCardCell,
    header: es.transaction.headers.creditCard,
  }),
  columnHelper.accessor('description', {
    cell: DescriptionCell,
    header: es.transaction.headers.description,
  }),
  columnHelper.accessor('amount', {
    cell: ({ getValue }: CellContext<TransactionDto, number>) => (
      <AccountableCell amount={quotation ? getValue() * quotation.price : getValue()} />
    ),
    header: es.transaction.headers.amount,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props: CellContext<TransactionDto, any>) => {
      const actions: ActionButton<TransactionDto>[] = [
        {
          label: 'Edit',
          icon: 'edit',
          colorScheme: 'primary',
          onClick: (row: TransactionDto) => onUpdate(row.id),
        },
        {
          label: 'Remove',
          icon: 'trash-alt',
          colorScheme: 'danger',
          onClick: (row: TransactionDto) => onRemove(row.id),
        },
      ];
      return props.row.original.id && <ActionsCell actions={actions} row={props.row.original} />;
    },
    header: es.common.headers.actions,
  }),
];
