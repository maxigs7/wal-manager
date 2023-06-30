import { Tbody, Td, Tr, useColorModeValue } from '@chakra-ui/react';
import { flexRender, RowModel } from '@tanstack/react-table';

import SkeletonRow from './skeleton-row';

type Props<T extends object> = {
  emptyText?: string;
  isLoading?: boolean;
  isRowHighlighted?(row: T): boolean;
  model: RowModel<T>;
  numberOfColumns: number;
};

const Body = <T extends object>({
  emptyText,
  isRowHighlighted,
  isLoading,
  model,
  numberOfColumns = 1,
}: Props<T>): React.ReactElement => {
  const rowBg = useColorModeValue('gray.100', 'primary.700');
  return (
    <Tbody>
      {isLoading && <SkeletonRow numberOfColumns={numberOfColumns} numberOfRows={5} />}
      {model.rows.map((row) => {
        return (
          <Tr
            key={row.id}
            bg={row.depth > 0 ? rowBg : undefined}
            opacity={isRowHighlighted && isRowHighlighted(row.original) ? '0.5' : undefined}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              );
            })}
          </Tr>
        );
      })}
      {!model.rows.length && (
        <Tr>
          <Td colSpan={numberOfColumns} p={10} textAlign="center">
            {emptyText}
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};

export default Body;
