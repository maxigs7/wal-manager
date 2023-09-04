import 'server-only';

import { Suspense } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { getScopedI18n } from '@/i18n/server';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { AccountTable } from '@/m/accounts/account-table';
import TableSkeleton from '@/m/shared/loader/table-skeleton';
import { getUser } from '@/supabase';

import CreateButton from './create-button';

export const revalidate = 0;

const Page = async () => {
  const supabase = createServerClient();
  const user = await getUser(supabase);
  const t = await getScopedI18n('common');
  return (
    <Stack pt={2} spacing={2}>
      <Box>
        <CreateButton userId={user?.id as string}>{t('create')}</CreateButton>
      </Box>
      <Suspense fallback={<TableSkeleton />}>
        <AccountTable />
      </Suspense>
    </Stack>
  );
};

export default Page;
