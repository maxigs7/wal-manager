import { HeaderGroup, TableHeaderProps } from 'react-table';

import classnames from 'classnames';

export interface IRowHeaders<T extends Record<string, unknown>> {
  headers: HeaderGroup<T>[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars
export function RowHeaders<T extends Record<string, unknown>>({
  headers,
  ...headerProps
}: IRowHeaders<T> & TableHeaderProps): React.ReactElement {
  console.log('RowHeaders rendering...');
  return (
    <tr {...headerProps}>
      {headers.map((column: any) => (
        <th
          className={classnames(
            'px-6 py-3',
            'border border-solid border-l-0 border-r-0',
            'align-middle text-xs uppercase  whitespace-nowrap font-semibold text-left',
            'bg-blueGray-50 text-blueGray-500 border-blueGray-100',
          )}
          {...column.getHeaderProps()}
        >
          {column.render('Header')}
        </th>
      ))}
    </tr>
  );
}
