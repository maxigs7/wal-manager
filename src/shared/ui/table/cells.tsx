import { CellProps } from 'react-table';

import { format, parseISO } from 'date-fns';

export const DateCell = <T extends Record<string, unknown>, D extends string>({
  cell: { value },
}: CellProps<T, D>): React.ReactElement => <>{format(parseISO(value), 'dd/MM/yyyy')}</>;
