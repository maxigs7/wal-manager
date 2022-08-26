import { Column } from 'react-table';

import { Flex } from '@chakra-ui/react';

import { formatToCurrency } from '@lib';
import { Account, getAccountTypeName, getCurrencyName } from '@models';
import { BooleanCell } from '@shared';

import TypeIcon from '../type-icon';
import { ActionsCell } from './cells';

interface IProps {
  onRemove(id: string): void;
  onUpdate(id: string): void;
}

type GetColumnsType = (props: IProps) => Column<Account>[];

export const getColumns: GetColumnsType = ({ onRemove, onUpdate }) => [
  {
    accessor: 'type',
    Cell: (props) => (
      <Flex align="center" gap="3">
        <TypeIcon size="2x" type={props.value} /> {getAccountTypeName(props.value)}
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
    accessor: 'currency',
    Cell: (props) => getCurrencyName(props.value),
    disableSortBy: true,
    Header: 'Moneda',
  },
  {
    accessor: 'initialAmount',
    Cell: (props) => <>{props.value && formatToCurrency(props.value)}</>,
    Header: 'Monto Inicial',
    isNumeric: true,
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
