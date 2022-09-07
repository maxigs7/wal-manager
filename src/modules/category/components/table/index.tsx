import { useMemo } from 'react';

import { CategoryRow } from '@models';
import { Table } from '@shared';

import { Actions, getColumns } from './columns';

type Props = Actions & {
  data: CategoryRow[];
  isLoading: boolean;
};

const CategoryTable: React.FC<Props> = ({
  data,
  isLoading,
  onRemove,
  onSubCreate,
  onSubMove,
  onSubRemove,
  onSubUpdate,
  onUpdate,
}) => {
  const columns = useMemo(
    () => getColumns({ onRemove, onSubCreate, onSubMove, onSubRemove, onSubUpdate, onUpdate }),
    [onRemove, onSubCreate, onSubMove, onSubRemove, onSubUpdate, onUpdate],
  );

  return <Table columns={columns} data={data} isExpandable={true} isLoading={isLoading} />;
};

export { CategoryTable };
export type { Actions as CategoryTableActions };
