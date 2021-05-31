import { useReactTable } from './context';

export function TableBody<T extends Record<string, unknown>>(): React.ReactElement {
  const { getTableBodyProps, prepareRow, rows } = useReactTable<T>();
  console.log('TableBody rendering...');

  return (
    <tbody {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows.map((row) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {
                // Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  return (
                    <td
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })
              }
            </tr>
          );
        })
      }
    </tbody>
  );
}
