import { CellProps } from 'react-table';

import { format } from 'date-fns';

import Icon from '../icon';

export const BooleanCell = <T extends Record<string, unknown>, D extends boolean>({
  cell: { value },
}: CellProps<T, D>): React.ReactElement => <>{value && <Icon icon="check" fixedWidth />}</>;

export const DateCell = <T extends Record<string, unknown>, D extends Date>({
  cell: { value },
}: CellProps<T, D>): React.ReactElement => <>{format(value, 'dd/MM/yyyy')}</>;
