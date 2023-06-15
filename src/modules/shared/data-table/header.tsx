import { Flex, TableColumnHeaderProps, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

import SortingColumn from './sorting-column';

type Props<T extends object> = {
  headerGroups: HeaderGroup<T>[];
} & TableColumnHeaderProps;

const Header = <T extends object>({ headerGroups, ...thProps }: Props<T>): React.ReactElement => (
  <Thead>
    {headerGroups.map((headerGroup: HeaderGroup<T>) => (
      <Tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          const conditinalProps: TableColumnHeaderProps = {
            ...(header.colSpan === 1 ? {} : { colSpan: header.colSpan, textAlign: 'center' }),
          };
          return (
            <Th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              verticalAlign="bottom"
              whiteSpace="nowrap"
              {...thProps}
              {...conditinalProps}
            >
              {header.isPlaceholder ? null : (
                <Flex>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (
                    <SortingColumn direction={header.column.getIsSorted()} />
                  )}
                </Flex>
              )}
            </Th>
          );
        })}
      </Tr>
    ))}
  </Thead>
);

export default Header;
