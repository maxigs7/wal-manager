import React from 'react';
import { TableInstance } from 'react-table';

import { Th, Thead, Tr } from '@chakra-ui/table';

import { TransactionDto } from '@models';

import { SortingColumn } from './sorting';

const Header: React.FC<TableInstance<TransactionDto>> = ({ headerGroups }) => (
  <Thead>
    {headerGroups.map((headerGroup) => (
      <Tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <Th
            maxW="20"
            {...column.getHeaderProps(column.getSortByToggleProps())}
            isNumeric={column.isNumeric}
          >
            {column.render('Header')}
            {column.isSorted && <SortingColumn isSortedDesc={column.isSortedDesc} />}
          </Th>
        ))}
      </Tr>
    ))}
  </Thead>
);

export { Header };
