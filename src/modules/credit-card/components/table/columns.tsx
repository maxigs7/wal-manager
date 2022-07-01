import { Column } from 'react-table';

import { Flex } from '@chakra-ui/react';

import { CreditCard, getCreditCardTypeName } from '@models';

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
    Cell: (props) => (
      <Flex align="center" gap="3">
        <TypeIcon type={props.value} width="32" /> {getCreditCardTypeName(props.value)}
      </Flex>
    ),
    disableSortBy: true,
    Header: 'Tipo',
  },
  {
    accessor: 'name',
    Header: 'Nombre',
  },
  {
    accessor: 'id',
    Cell: (props) => <ActionsCell {...props} onRemove={onRemove} onUpdate={onUpdate} />,
    disableSortBy: true,
    Header: '...',
    width: '100px',
  },
];
