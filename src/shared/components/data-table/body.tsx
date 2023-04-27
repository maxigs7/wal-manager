import { Tbody, Td, Tr } from '@chakra-ui/react';
import { flexRender, RowModel } from '@tanstack/react-table';

import SkeletonRow from './skeleton-row';

interface IProps<T extends object> {
  emptyText?: string;
  isLoading?: boolean;
  isRowHighlighted?(row: T): boolean;
  model: RowModel<T>;
  numberOfColumns: number;
}

const Body = <T extends object>({
  emptyText,
  isRowHighlighted,
  isLoading,
  model,
  numberOfColumns = 1,
}: IProps<T>): React.ReactElement => (
  <Tbody>
    {isLoading && <SkeletonRow numberOfColumns={numberOfColumns} numberOfRows={5} />}
    {model.rows.map((row) => {
      return (
        <Tr
          key={row.id}
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

export default Body;
