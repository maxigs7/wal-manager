import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { es } from '@/i18n';
import { CategoryIcon } from '@/m/shared/category-icon';
import { ColorCircle } from '@/m/shared/color-circle';
import {
  ActionButton,
  ActionsCell,
  ExpandedAllCell,
  ExpandedCell,
} from '@/m/shared/data-table/cells';
import { ArrowCrossoverRightIcon, PencilIcon, PlusIcon, TrashIcon } from '@/m/shared/icons';
import { colorTransform } from '@/models';

import { CategoryRow } from '../models';

export type GetColumnsTypeParams = {
  onAdd: (parent: CategoryRow) => void;
  onMove: (subcategory: CategoryRow) => void;
  onRemove: (category: CategoryRow) => void;
  onUpdate: (category: CategoryRow) => void;
};
type GetColumnsType = (params: GetColumnsTypeParams) => ColumnDef<CategoryRow, any>[];

const columnHelper = createColumnHelper<CategoryRow>();

export const getColumns: GetColumnsType = (params) => [
  columnHelper.display({
    id: 'expander',
    header: ExpandedAllCell,
    cell: ExpandedCell,
  }),
  // Accessor Column
  columnHelper.accessor('name', {
    header: es.category.headers.name,
  }),
  columnHelper.accessor('color', {
    cell: (props: CellContext<CategoryRow, string>) =>
      props.getValue() ? <ColorCircle bg={colorTransform(props.getValue())} size="md" /> : null,
    header: es.category.headers.color,
    enableSorting: false,
  }),
  columnHelper.accessor('icon', {
    cell: (props: CellContext<CategoryRow, string>) => (
      <CategoryIcon boxSize="6" category={props.getValue()} />
    ),
    header: es.category.headers.icon,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props: CellContext<CategoryRow, any>) => {
      const {
        row: { original },
      } = props;
      const actions: ActionButton<CategoryRow>[] = [
        ...(!original.parentId
          ? [
              {
                colorScheme: 'success',
                onClick: params.onAdd,
                icon: PlusIcon,
                label: 'Add new sub category',
              } as ActionButton<CategoryRow>,
            ]
          : []),

        ...(original.parentId
          ? [
              {
                colorScheme: 'teal',
                icon: ArrowCrossoverRightIcon,
                onClick: params.onMove,
                label: 'Move to new parent',
              } as ActionButton<CategoryRow>,
            ]
          : []),
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
