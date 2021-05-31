import React from 'react';

import { useReactTable } from './context';
import { RowHeaders } from './row-headers';

export function TableHeader<T extends Record<string, unknown>>(): React.ReactElement {
  const { headerGroups } = useReactTable<T>();
  console.log('TableHeader rendering...');
  return (
    <thead>
      {
        // Loop over the header rows
        headerGroups.map((headerGroup) => (
          // Apply the header row props
          <RowHeaders headers={headerGroup.headers} {...headerGroup.getHeaderGroupProps()} />
        ))
      }
    </thead>
  );
}
