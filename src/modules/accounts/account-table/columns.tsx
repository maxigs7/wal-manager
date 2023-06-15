import { Flex } from '@chakra-ui/react';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { PencilIcon, TrashIcon } from '@/assets';
import { es } from '@/i18n';
import { ActionButton, ActionsCell, BooleanCell } from '@/m/shared/data-table/cells';
import {
  Account,
  AccountType,
  Currency,
  getAccountTypeName,
  getCurrencyName,
  QuotationType,
} from '@/models';
import { routes } from '@/routes';

import { AccountTypeIcon } from '../account-type-icon';

type GetColumnsType = () => ColumnDef<Account, any>[];

const columnHelper = createColumnHelper<Account>();

export const getColumns: GetColumnsType = () => [
  // Accessor Column
  columnHelper.accessor('type', {
    cell: (props: CellContext<Account, AccountType>) => (
      <Flex align="center" gap="3">
        <AccountTypeIcon boxSize="6" type={props.getValue()} />
        {getAccountTypeName(props.getValue())}
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
  columnHelper.accessor('quotationId', {
    cell: (props: CellContext<Account, QuotationType>) => {
      return props.getValue() || null;
    },
    header: es.account.headers.quotationId,
  }),
  columnHelper.accessor('isPrimary', {
    cell: BooleanCell,
    header: es.account.headers.isPrimary,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props: CellContext<Account, any>) => {
      const actions: ActionButton<Account>[] = [
        {
          label: 'Edit',
          href: routes.settings.account.update(props.row.original.id),
          icon: PencilIcon,
          colorScheme: 'primary',
        },
        {
          label: 'Remove',
          href: routes.settings.account.delete(props.row.original.id),
          icon: TrashIcon,
          colorScheme: 'danger',
        },
      ];
      return <ActionsCell actions={actions} row={props.row.original} />;
    },
    header: es.common.headers.actions,
  }),
];