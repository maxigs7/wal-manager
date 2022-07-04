import { Column } from 'react-table';

import { CategoryRow } from '@models';
import { ColorCircle, ExpandedAllCell, ExpandedCell, Icon } from '@shared';

import { Actions, ActionsCell } from './cells';

type GetColumnsType = (props: Actions) => Column<CategoryRow>[];

export const getColumns: GetColumnsType = (actions) => [
  {
    // Build our expander column
    id: 'expander', // Make sure it has an ID
    Header: ExpandedAllCell,
    Cell: ExpandedCell,
    headerClassName: 'text-center',
  },
  {
    accessor: 'name',
    Header: 'Nombre',
  },
  {
    accessor: 'color',
    Cell: (props) => (props.value ? <ColorCircle bg={props.value} h="6" w="6" /> : null),
    Header: 'Color',
  },
  {
    accessor: 'icon',
    Cell: (props) => (props.value ? <Icon icon={props.value} size="2x" fixedWidth /> : null),
    disableSortBy: true,
    Header: 'Icono',
  },
  {
    accessor: 'id',
    Cell: (props) => <ActionsCell {...props} {...actions} />,
    disableSortBy: true,
    Header: '...',
  },
];
