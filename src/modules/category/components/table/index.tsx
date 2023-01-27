import { useMemo } from 'react';

import { Table } from '@/shared';

import { CategoryRow } from '../../models';
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
  onSubUpdate,
  onUpdate,
}) => {
  const columns = useMemo(
    () => getColumns({ onRemove, onSubCreate, onSubMove, onSubUpdate, onUpdate }),
    [onRemove, onSubCreate, onSubMove, onSubUpdate, onUpdate],
  );

  return <Table columns={columns} data={data} isExpandable={true} isLoading={isLoading} />;
};

export { CategoryTable };
export type { Actions as CategoryTableActions };
