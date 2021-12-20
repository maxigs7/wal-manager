import { CellProps } from 'react-table';

import { format } from 'date-fns';

export const DateCell = <T extends Record<string, unknown>, D extends Date>({
  cell: { value },
}: CellProps<T, D>): React.ReactElement => <>{format(value, 'dd/MM/yyyy')}</>;
