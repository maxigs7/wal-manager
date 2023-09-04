import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';

import { useScopedI18n } from '@/i18n/client';
import { Account, AccountType, getCurrencyName, getQuotationTypeName } from '@/models';

import AccountTypeIcon from '../account-type-icon';

export type AccountHeadersLocale = Record<keyof Account, string>;

type Params = {
  headersLocale: Partial<AccountHeadersLocale>;
  onEdit: (row: Account) => void;
  onRemove: (row: Account) => void;
};

export const useColDefs = ({ headersLocale, onEdit, onRemove }: Params): GridColDef<Account>[] => {
  const tCommon = useScopedI18n('common.table');

  return [
    {
      field: 'type',
      headerName: headersLocale.type,
      renderCell: ({ value }: GridRenderCellParams<Account, AccountType>) => (
        <AccountTypeIcon type={value as AccountType} />
      ),
    },
    {
      field: 'name',
      headerName: headersLocale.name,
      flex: 1,
    },
    {
      field: 'currency',
      headerName: headersLocale.currency,
      valueGetter: ({ row }) => getCurrencyName(row.currency),
    },
    {
      field: 'quotationId',
      headerName: headersLocale.quotationId,
      valueGetter: ({ row }) => getQuotationTypeName(row.quotationId),
    },
    {
      field: 'isPrimary',
      headerName: headersLocale.isPrimary,
      type: 'boolean',
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams<Account>) => [
        <GridActionsCellItem
          key="actions.delete"
          icon={<DeleteIcon />}
          label={tCommon('actions.delete')}
          onClick={() => onRemove(params.row)}
        />,
        <GridActionsCellItem
          key="actions.edit"
          icon={<ModeEditIcon />}
          label={tCommon('actions.edit')}
          onClick={() => onEdit(params.row)}
        />,
      ],
    },
  ];
};
