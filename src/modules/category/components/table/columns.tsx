import { IconName } from '@fortawesome/free-solid-svg-icons';
import { CellContext, ColumnDef, createColumnHelper } from '@tanstack/react-table';


import { es } from '@/i18n';
import { colorTransform } from '@/models';
import {
  ActionButton,
  ActionsCell,
  ColorCircle,
  ExpandedAllCell,
  ExpandedCell,
  Icon,
} from '@/shared';

import { CategoryRow } from '../../models';

export interface Actions {
  onRemove(id: string): void;
  onSubCreate(parentId: string): void;
  onSubMove(parentId: string, id: string): void;
  onSubUpdate(parentId: string, id: string): void;
  onUpdate(id: string): void;
}

type GetColumnsType = (props: Actions) => ColumnDef<CategoryRow, any>[];

const columnHelper = createColumnHelper<CategoryRow>();

export const getColumns: GetColumnsType = ({
  onRemove,
  onSubCreate,
  onSubMove,
  onSubUpdate,
  onUpdate,
}) => [
  columnHelper.display({
    id: 'expander',
    header: ExpandedAllCell,
    cell: ExpandedCell,
  }),
  columnHelper.accessor('name', {
    header: es.category.headers.name,
  }),
  columnHelper.accessor('color', {
    cell: (props: CellContext<CategoryRow, string>) =>
      props.getValue() ? <ColorCircle bg={colorTransform(props.getValue())} h="6" w="6" /> : null,
    header: es.category.headers.color,
    enableSorting: false,
  }),
  columnHelper.accessor('icon', {
    cell: (props: CellContext<CategoryRow, IconName>) =>
      props.getValue() ? <Icon icon={props.getValue()} size="2x" fixedWidth /> : null,
    header: es.category.headers.icon,
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props: CellContext<CategoryRow, any>) => {
      const {
        row: { original },
      } = props;
      const onRemoveHandler = () => {
        onRemove(original.id);
      };

      const onUpdateHandler = () => {
        if (original.parentId) {
          onSubUpdate(original.parentId, original.id);
          return;
        }
        onUpdate(original.id);
      };

      const actions: ActionButton<CategoryRow>[] = [
        ...(!original.parentId
          ? [
              {
                label: 'Add new sub category',
                icon: 'plus',
                colorScheme: 'success',
                onClick: (row: CategoryRow) => onSubCreate(row.id),
              } as ActionButton<CategoryRow>,
            ]
          : []),
        ...(original.parentId
          ? [
              {
                label: 'Move to new parent',
                icon: 'arrow-right-arrow-left',
                colorScheme: 'teal',
                onClick: (row: CategoryRow) => onSubMove(row.parentId as string, row.id),
              } as ActionButton<CategoryRow>,
            ]
          : []),
        {
          label: 'Edit',
          icon: 'edit',
          colorScheme: 'primary',
          onClick: onUpdateHandler,
        },
        {
          label: 'Remove',
          icon: 'trash-alt',
          colorScheme: 'danger',
          onClick: onRemoveHandler,
        },
      ];
      return <ActionsCell actions={actions} row={props.row.original} />;
    },
    header: es.common.headers.actions,
  }),
];
