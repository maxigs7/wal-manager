import { Flex, TableColumnHeaderProps, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';

import SortingColumn from './sorting-column';

interface IProps<T extends object> {
  headerGroups: HeaderGroup<T>[];
}

const Header = <T extends object>({ headerGroups }: IProps<T>): React.ReactElement => (
  <Thead>
    {headerGroups.map((headerGroup: HeaderGroup<T>) => (
      <Tr key={headerGroup.id}>
        {headerGroup.headers.map((header, ix, arr) => {
          const conditinalProps: TableColumnHeaderProps = {
            ...(ix === arr.length - 1
              ? {}
              : {
                  borderRight: 'solid',
                  borderRightColor: 'gray.300',
                  borderRightWidth: 'thin',
                }),

            ...(header.colSpan === 1 ? {} : { colSpan: header.colSpan, textAlign: 'center' }),
          };
          return (
            <Th
              key={header.id}
              borderBottom="solid"
              borderBottomColor="gray.300"
              borderBottomWidth="thin"
              borderTop="solid"
              borderTopColor="gray.300"
              borderTopWidth="thin"
              onClick={header.column.getToggleSortingHandler()}
              whiteSpace="nowrap"
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
