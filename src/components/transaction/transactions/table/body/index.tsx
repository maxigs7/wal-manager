import React from 'react';
import { TableInstance } from 'react-table';

import { Tbody, Td, Tr } from '@chakra-ui/table';

import { TransactionDto } from '@models';

const Body: React.FC<TableInstance<TransactionDto>> = ({ prepareRow, rows }) => (
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
  </Tbody>
);

export { Body };
