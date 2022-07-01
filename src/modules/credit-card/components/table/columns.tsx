import { Column } from 'react-table';

import { CreditCard } from '@models';
import { BooleanCell } from '@shared';

import TypeIcon from '../type-icon';
import { ActionsCell } from './cells';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

type GetColumnsType = (props: IProps) => Column<CreditCard>[];

export const getColumns: GetColumnsType = ({ onRemove, onUpdate }) => [
  {
    accessor: 'type',
    Cell: (props) => <TypeIcon type={props.value} width="24" />,
    disableSortBy: true,
    Header: 'Tipo',
  },
  {
    accessor: 'name',
    Header: 'Nombre',
  },
  {
    accessor: 'isDefault',
    Cell: BooleanCell,
    disableSortBy: true,
    Header: 'Por Defecto',
  },
  {
    accessor: 'id',
    Cell: (props) => <ActionsCell {...props} onRemove={onRemove} onUpdate={onUpdate} />,
    disableSortBy: true,
    Header: '...',
    width: '100px',
  },
];
