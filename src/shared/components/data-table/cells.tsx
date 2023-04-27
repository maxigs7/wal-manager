import { ButtonGroup, Icon, IconButton, IconProps } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { CellContext, HeaderContext } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';

export const BooleanCell = <T extends Record<string, unknown>, D extends boolean>({
  getValue,
}: CellContext<T, D>): React.ReactElement => <>{getValue() && <Icon as={CheckIcon} />}</>;

export const DateCell = <T extends Record<string, unknown>, D extends string>({
  getValue,
}: CellContext<T, D>): React.ReactElement | null =>
  getValue() ? <>{format(parseISO(getValue()), 'dd/MM/yyyy')}</> : null;

export const ExpandedCell = <T extends Record<string, unknown>, D>({
  row,
}: CellContext<T, D>): React.ReactElement | null =>
  row.getCanExpand() ? (
    <IconButton
      aria-label="expander"
      icon={<Icon as={row.getIsExpanded() ? ArrowDownIcon : ArrowRightIcon} />}
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
    icon={<Icon as={getIsAllRowsExpanded() ? ArrowDownIcon : ArrowRightIcon} />}
    onClick={getToggleAllRowsExpandedHandler()}
    size="xs"
    variant="ghost"
  />
);

export type ActionButton<T extends Record<string, unknown>> = {
  colorScheme?: string;
  icon: typeof ArrowDownIcon;
  iconSize?: IconProps['boxSize'];
  label: string;
  onClick(row: T): void;
};

export type ActionsCellProps<T extends Record<string, unknown>> = {
  actions: ActionButton<T>[];
  row: T;
};

export const ActionsCell = <T extends Record<string, unknown>>({
  actions,
  row,
}: ActionsCellProps<T>): React.ReactElement => {
  return (
    <ButtonGroup size="xs" spacing="1" variant="outline">
      {actions.map((action) => (
        <IconButton
          key={action.label}
          aria-label={action.label}
          colorScheme={action.colorScheme}
          icon={<Icon as={action.icon} boxSize={action.iconSize || '4'} />}
          onClick={() => action.onClick(row)}
          rounded="full"
          size="xs"
        />
      ))}
    </ButtonGroup>
  );
};
