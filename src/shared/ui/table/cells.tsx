import { CellProps } from 'react-table';

import { format, parseJSON } from 'date-fns';

export const DateCell = <T extends Record<string, unknown>, D extends string>({
  cell: { value },
}: CellProps<T, D>): React.ReactElement => <>{format(parseJSON(value), 'dd/MM/yyyy')}</>;
