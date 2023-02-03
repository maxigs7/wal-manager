import 'server-only';

import { PropsWithChildren } from 'react';

import { WithClientProviders } from '@/bootstrap';
import { createServerClient } from '@/lib/supabase/server';

import '@/styles/globals.css';

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head />
      <body>
        <WithClientProviders session={session}>{children}</WithClientProviders>
      </body>
    </html>
  );
}
