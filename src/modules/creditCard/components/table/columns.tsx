import { Flex } from '@chakra-ui/react';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { es } from '@i18n';
import { CreditCard, CreditCardType, getCreditCardTypeName } from '@models';
import { ActionButton, ActionsCell } from '@shared';

import { CreditCardTypeIcon } from '../type-icon';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

type GetColumnsType = (props: IProps) => ColumnDef<CreditCard, any>[];

const columnHelper = createColumnHelper<CreditCard>();

export const getColumns: GetColumnsType = ({ onRemove, onUpdate }) => [
  // Accessor Column
  columnHelper.accessor('type', {
    cell: (props: CellContext<CreditCard, CreditCardType>) => (
      <Flex align="center" gap="3">
        <CreditCardTypeIcon type={props.getValue()} width="32" />{' '}
        {getCreditCardTypeName(props.getValue())}
      </Flex>
    ),
    enableSorting: false,
    header: es.creditCard.headers.type,
  }),
  columnHelper.accessor('name', {
    header: es.creditCard.headers.name,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props: CellContext<CreditCard, any>) => {
      const actions: ActionButton<CreditCard>[] = [
        {
          label: 'Edit',
          icon: 'edit',
          colorScheme: 'primary',
          onClick: (row: CreditCard) => onUpdate(row.id),
        },
        {
          label: 'Remove',
          icon: 'trash-alt',
          colorScheme: 'danger',
          onClick: (row: CreditCard) => onRemove(row.id),
        },
      ];
      return <ActionsCell actions={actions} row={props.row.original} />;
    },
    header: es.common.headers.actions,
  }),
];
