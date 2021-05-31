import React from 'react';
import { TableOptions, useTable } from 'react-table';

import { ReactTableContext } from './context';
import { TableBody } from './table-body';
import { TableHeader } from './table-header';

export interface ITable<T extends Record<string, unknown>> extends TableOptions<T> {
  data: T[];
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
}: ITable<T>): React.ReactElement {
  const tableInstance = useTable<T>({
    columns,
    data,
  });
  console.log('Table rendering...');
  return (
    <ReactTableContext.Provider value={{ table: { ...tableInstance } }}>
      <table className="items-center w-full bg-transparent border-collapse">
        <TableHeader />
        <TableBody />
      </table>
    </ReactTableContext.Provider>
  );

  // return (
  //   <table {...getTableProps()}>
  //     <thead>
  //       {
  //         // Loop over the header rows
  //         headerGroups.map((headerGroup) => (
  //           // Apply the header row props
  //           <tr {...headerGroup.getHeaderGroupProps()}>
  //             {
  //               // Loop over the headers in each row
  //               headerGroup.headers.map((column) => (
  //                 // Apply the header cell props
  //                 <th {...column.getHeaderProps()}>
  //                   {
  //                     // Render the header
  //                     column.render('Header')
  //                   }
  //                 </th>
  //               ))
  //             }
  //           </tr>
  //         ))
  //       }
  //     </thead>
  //     {/* Apply the table body props */}
  //     <tbody {...getTableBodyProps()}>
  //       {
  //         // Loop over the table rows
  //         rows.map((row) => {
  //           // Prepare the row for display
  //           prepareRow(row);
  //           return (
  //             // Apply the row props
  //             <tr {...row.getRowProps()}>
  //               {
  //                 // Loop over the rows cells
  //                 row.cells.map((cell) => {
  //                   // Apply the cell props
  //                   return (
  //                     <td {...cell.getCellProps()}>
  //                       {
  //                         // Render the cell contents
  //                         cell.render('Cell')
  //                       }
  //                     </td>
  //                   );
  //                 })
  //               }
  //             </tr>
  //           );
  //         })
  //       }
  //     </tbody>
  //   </table>
  // );
}
