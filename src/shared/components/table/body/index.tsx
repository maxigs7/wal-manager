import { TableInstance } from 'react-table';

import { Tbody, Td, Tr } from '@chakra-ui/table';

interface IProps<T extends Record<string, unknown>> extends TableInstance<T> {
  emptyText?: string;
}

const Body = <T extends Record<string, unknown>>({
  columns,
  emptyText,
  prepareRow,
  rows,
}: IProps<T>): React.ReactElement => (
  <Tbody>
    {rows.map((row) => {
      prepareRow(row);
      return (
        <Tr key={row.id}>
          {row.cells.map((cell) => (
            <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
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
