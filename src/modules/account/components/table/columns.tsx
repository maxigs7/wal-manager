import { Flex } from '@chakra-ui/react';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { es } from '@i18n';
import { formatToCurrency } from '@lib';
import { Account, AccountType, Currency, getAccountTypeName, getCurrencyName } from '@models';
import { ActionButton, ActionsCell, BooleanCell } from '@shared';

import { AccountTypeIcon } from '../type-icon';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

type GetColumnsType = (props: IProps) => ColumnDef<Account, any>[];

const columnHelper = createColumnHelper<Account>();

export const getColumns: GetColumnsType = ({ onRemove, onUpdate }) => [
  // Accessor Column
  columnHelper.accessor('type', {
    cell: (props: CellContext<Account, AccountType>) => (
      <Flex align="center" gap="3">
        <AccountTypeIcon size="2x" type={props.getValue()} /> {getAccountTypeName(props.getValue())}
      </Flex>
    ),
    enableSorting: false,
    header: es.account.headers.type,
  }),
  columnHelper.accessor('name', {
    header: es.account.headers.name,
  }),
  columnHelper.accessor('currency', {
    cell: (props: CellContext<Account, Currency>) => getCurrencyName(props.getValue()),
    header: es.account.headers.currency,
    enableSorting: false,
  }),
  columnHelper.accessor('initialAmount', {
    cell: (props: CellContext<Account, number>) =>
      props.getValue() && formatToCurrency(props.getValue()),
    header: es.account.headers.initialAmount,
  }),
  columnHelper.accessor('isDefault', {
    cell: BooleanCell,
    header: es.account.headers.isDefault,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props: CellContext<Account, any>) => {
      const actions: ActionButton<Account>[] = [
        {
          label: 'Edit',
          icon: 'edit',
          colorScheme: 'primary',
          onClick: (row: Account) => onUpdate(row.id),
        },
        {
          label: 'Remove',
          icon: 'trash-alt',
          colorScheme: 'danger',
          onClick: (row: Account) => onRemove(row.id),
        },
      ];
      return <ActionsCell actions={actions} row={props.row.original} />;
    },
    header: es.common.headers.actions,
  }),
];
