'use client';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid/DataGrid';

import { useI18nGrid } from '@/i18n';
import { Account } from '@/models';

import { AccountHeadersLocale, useColDefs } from './useColDefs';

type Props = {
  data: Account[];
  headersLocale: Partial<AccountHeadersLocale>;
};

const AccountTable: React.FC<Props> = ({ data, headersLocale }) => {
  const gridLocale = useI18nGrid();
  const columns = useColDefs({
    headersLocale,
    onEdit: () => {
      console.log('edit');
    },
    onRemove: () => {
      console.log('remove');
    },
  });

  return (
    <Paper>
      <DataGrid
        columns={columns}
        density="compact"
        localeText={gridLocale}
        rows={data}
        autoHeight
        disableRowSelectionOnClick
      />
    </Paper>
  );
};

export default AccountTable;
