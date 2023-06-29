import { Flex } from '@chakra-ui/react';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { es } from '@/i18n';
import { CreditCardTypeIcon } from '@/m/shared/credit-card-type-icon';
import { ActionButton, ActionsCell } from '@/m/shared/data-table/cells';
import { PencilIcon, TrashIcon } from '@/m/shared/icons';
import { CreditCard, CreditCardType, getCreditCardTypeName } from '@/models';

export type GetColumnsTypeParams = {
  onRemove: (creditCard: CreditCard) => void;
  onUpdate: (creditCard: CreditCard) => void;
};
type GetColumnsType = (params: GetColumnsTypeParams) => ColumnDef<CreditCard, any>[];

const columnHelper = createColumnHelper<CreditCard>();

export const getColumns: GetColumnsType = (params) => [
  // Accessor Column
  columnHelper.accessor('type', {
    cell: (props: CellContext<CreditCard, CreditCardType>) => (
      <Flex align="center" gap="3">
        <CreditCardTypeIcon boxSize="6" type={props.getValue()} />
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
          onClick: params.onUpdate,
          icon: PencilIcon,
          colorScheme: 'primary',
        },
        {
          label: 'Remove',
          onClick: params.onRemove,
          icon: TrashIcon,
          colorScheme: 'danger',
        },
      ];
      return <ActionsCell actions={actions} row={props.row.original} />;
    },
    header: es.common.headers.actions,
  }),
];
