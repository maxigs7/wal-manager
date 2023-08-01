import 'server-only';

import { cookies } from 'next/headers';
import { PropsWithChildren } from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';

import { AppProviders } from './app-providers';

const RootLayout = async ({ children }: PropsWithChildren) => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'es';
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang={locale}>
      <body>
        <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
