import 'server-only';

import { PropsWithChildren } from 'react';

import { createServerClient } from '@/lib/supabase/server';

import { AppProviders } from './app-providers';


const RootLayout = async ({ children }: PropsWithChildren) => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="es">
      <body>
        <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
