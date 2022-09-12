import { ButtonGroup, IconButton } from '@chakra-ui/react';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { CellContext, HeaderContext } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Icon } from '../icon';

export const BooleanCell = <T extends Record<string, unknown>, D extends boolean>({
  getValue,
}: CellContext<T, D>): React.ReactElement => <>{getValue() && <Icon icon="check" fixedWidth />}</>;

export const DateCell = <T extends Record<string, unknown>, D extends Date>({
  getValue,
}: CellContext<T, D>): React.ReactElement => <>{format(getValue(), 'dd/MM/yyyy')}</>;

export const ExpandedCell = <T extends Record<string, unknown>, D>({
  row,
}: CellContext<T, D>): React.ReactElement | null =>
  row.getCanExpand() ? (
    <IconButton
      aria-label="expander"
      icon={<Icon icon={row.getIsExpanded() ? 'angle-down' : 'angle-right'} />}
      onClick={row.getToggleExpandedHandler()}
      pl={row.depth * 2}
      size="xs"
      variant="ghost"
    />
  ) : null;

export const ExpandedAllCell = <T extends Record<string, unknown>, D>({
  table: { getIsAllRowsExpanded, getToggleAllRowsExpandedHandler },
}: HeaderContext<T, D>): React.ReactElement | null => (
  <IconButton
    aria-label="expander"
    icon={<Icon icon={getIsAllRowsExpanded() ? 'angle-down' : 'angle-right'} />}
    onClick={getToggleAllRowsExpandedHandler()}
    size="xs"
    variant="ghost"
  />
);

export interface ActionButton<T extends Record<string, unknown>> {
  colorScheme?: string;
  icon: IconName;
  label: string;
  onClick(row: T): void;
}

export interface ActionsCellProps<T extends Record<string, unknown>> {
  actions: ActionButton<T>[];
  row: T;
}

export const ActionsCell = <T extends Record<string, unknown>>({
  actions,
  row,
}: ActionsCellProps<T>): React.ReactElement => {
  return (
    <ButtonGroup size="xs" variant="ghost" isAttached>
      {actions.map((action) => (
        <IconButton
          key={action.label}
          aria-label={action.label}
          colorScheme={action.colorScheme}
          icon={<Icon icon={action.icon} fixedWidth />}
          onClick={() => action.onClick(row)}
          size="xs"
        />
      ))}
    </ButtonGroup>
  );
};
