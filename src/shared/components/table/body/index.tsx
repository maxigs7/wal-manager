import { Cell, Row, TableCellProps, TableInstance, TableRowProps } from 'react-table';

import { Tbody, Td, Tr } from '@chakra-ui/table';

interface IProps<T extends Record<string, unknown>> extends TableInstance<T> {
  emptyText?: string;
  getCellProps?(cell: Cell<T>): TableCellProps;
  getRowProps?(row: Row<T>): TableRowProps;
}

const Body = <T extends Record<string, unknown>>({
  columns,
  emptyText,
  getCellProps,
  getRowProps,
  prepareRow,
  rows,
}: IProps<T>): React.ReactElement => (
  <Tbody>
    {rows.map((row) => {
      prepareRow(row);
      return (
        <Tr {...row.getRowProps(getRowProps && getRowProps(row))}>
          {row.cells.map((cell) => (
            <Td
              {...cell.getCellProps(getCellProps && getCellProps(cell))}
              isNumeric={cell.column.isNumeric}
            >
              {cell.render('Cell')}
            </Td>
          ))}
        </Tr>
      );
    })}
    {!rows.length && (
      <Tr>
        <Td colSpan={columns.length} p={10} textAlign="center">
          {emptyText}
        </Td>
      </Tr>
    )}
  </Tbody>
);

export default Body;
