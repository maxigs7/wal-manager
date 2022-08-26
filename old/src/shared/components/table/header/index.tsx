import { TableInstance } from 'react-table';

import { Th, Thead, Tr } from '@chakra-ui/table';

import SortingColumn from './sorting';

const Header = <T extends Record<string, unknown>>({
  headerGroups,
}: TableInstance<T>): React.ReactElement => (
  <Thead>
    {headerGroups.map((headerGroup) => (
      <Tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <Th
            {...column.getHeaderProps(column.getSortByToggleProps())}
            isNumeric={column.isNumeric}
            whiteSpace="nowrap"
          >
            {column.render('Header')}
            {column.isSorted && <SortingColumn isSortedDesc={column.isSortedDesc} />}
          </Th>
        ))}
      </Tr>
    ))}
  </Thead>
);

export default Header;
