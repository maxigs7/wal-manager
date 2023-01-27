import { Switch } from '@chakra-ui/react';
import { CellContext, ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import { parseISO } from 'date-fns';

import { IDolarsi } from '@api';
import { es } from '@i18n';
import { dateSortType } from '@lib';
import { GetMovementItem } from '@models';
import { DateCell, Icon } from '@shared';
import { ActionButton, ActionsCell } from '@shared';

import { AccountableCell, CategoryCell, CreditCardCell, DescriptionCell } from './cells';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
  onUpdateIsPaid(id: string, checked: boolean): void;
  quotation?: IDolarsi;
}

type GetColumnsType = (props: IProps) => ColumnDef<GetMovementItem, any>[];

const columnHelper = createColumnHelper<GetMovementItem>();

export const getColumns: GetColumnsType = ({ onRemove, onUpdate, onUpdateIsPaid, quotation }) => [
  // Accessor Column
  columnHelper.accessor('isPaid', {
    cell: ({ getValue, row }: CellContext<GetMovementItem, boolean>) => {
      return (
        <Switch
          colorScheme="accent"
          isChecked={getValue()}
          onChange={(e) => onUpdateIsPaid(row.original.id, e.target.checked)}
        />
      );
    },
    header: es.movement.headers.isPaid,
  }),
  columnHelper.accessor('rootCategory', {
    cell: CategoryCell,
    header: es.movement.headers.category,
    sortingFn: (rowA: Row<GetMovementItem>, rowB: Row<GetMovementItem>): number => {
      if (rowA.original.rootCategory > rowB.original.rootCategory) return 1;
      if (rowB.original.rootCategory > rowA.original.rootCategory) return -1;
      if (!rowA.original.subCategory) return -1;
      if (!rowB.original.subCategory) return 1;
      if (rowA.original.subCategory > rowB.original.subCategory) return 1;
      if (rowB.original.subCategory > rowA.original.subCategory) return -1;
      return 0;
    },
  }),
  columnHelper.accessor('date', {
    header: es.movement.headers.date,
    cell: DateCell,
    sortingFn: (rowA: Row<GetMovementItem>, rowB: Row<GetMovementItem>): number =>
      dateSortType(parseISO(rowA.original.date), parseISO(rowB.original.date)),
  }),
  columnHelper.accessor('creditCard', {
    cell: CreditCardCell,
    header: es.movement.headers.creditCard,
  }),
  columnHelper.accessor('description', {
    cell: DescriptionCell,
    header: es.movement.headers.description,
  }),
  columnHelper.accessor('amount', {
    cell: ({ getValue }: CellContext<GetMovementItem, number>) => (
      <AccountableCell amount={quotation ? getValue() * quotation.price : getValue()} />
    ),
    header: es.movement.headers.amount,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props: CellContext<GetMovementItem, any>) => {
      const actions: ActionButton<GetMovementItem>[] = [
        {
          label: 'Edit',
          icon: 'edit',
          colorScheme: 'primary',
          onClick: (row: GetMovementItem) => onUpdate(row.id),
        },
        {
          label: 'Remove',
          icon: 'trash-alt',
          colorScheme: 'danger',
          onClick: (row: GetMovementItem) => onRemove(row.id),
        },
      ];
      return props.row.original.id && <ActionsCell actions={actions} row={props.row.original} />;
    },
    header: es.common.headers.actions,
  }),
];
