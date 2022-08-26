import { CellProps } from 'react-table';

import { format } from 'date-fns';

import Icon from '../icon';

export const BooleanCell = <T extends Record<string, unknown>, D extends boolean>({
  cell: { value },
}: CellProps<T, D>): React.ReactElement => <>{value && <Icon icon="check" fixedWidth />}</>;

export const DateCell = <T extends Record<string, unknown>, D extends Date>({
  cell: { value },
}: CellProps<T, D>): React.ReactElement => <>{format(value, 'dd/MM/yyyy')}</>;

export const ExpandedCell = <T extends Record<string, unknown>, D>({
  row,
}: CellProps<T, D>): React.ReactElement | null =>
  row.canExpand ? (
    <Icon
      icon={row.isExpanded ? 'angle-down' : 'angle-right'}
      pl={row.depth * 2}
      {...row.getToggleRowExpandedProps()}
    />
  ) : null;

export const ExpandedAllCell = <T extends Record<string, unknown>, D>({
  getToggleAllRowsExpandedProps,
  isAllRowsExpanded,
}: CellProps<T, D>): React.ReactElement | null => (
  <Icon
    icon={isAllRowsExpanded ? 'angle-down' : 'angle-right'}
    {...getToggleAllRowsExpandedProps()}
  />
);
