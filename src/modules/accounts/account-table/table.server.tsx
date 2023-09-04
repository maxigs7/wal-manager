import 'server-only';

import { getScopedI18n } from '@/i18n/server';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { select } from '@/supabase';

import AccountTable from './table.client';
import { AccountHeadersLocale } from './useColDefs';

const AccountTableServer: React.FC = async () => {
  const tHeader = await getScopedI18n('settings.accounts.headers');
  const supabase = createServerClient();
  const data = await select<'account'>(
    supabase,
    'account',
  )({ order: { field: 'name', ascending: true } });

  const headers: Partial<AccountHeadersLocale> = {
    currency: tHeader('currency'),
    name: tHeader('name'),
    isPrimary: tHeader('isPrimary'),
    quotationId: tHeader('quotationId'),
    type: tHeader('type'),
  };

  return <AccountTable data={data} headersLocale={headers} />;
};

export default AccountTableServer;
