import 'server-only';
import '@/styles/globals.css';

import { PropsWithChildren } from 'react';

import { createServerClient } from '@/lib/supabase/create-server-client';
import { PageBase } from '@/m/shared/models/page';

import { Providers } from './providers';

const RootLayout = async ({ children, params }: PropsWithChildren & PageBase) => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang={params.locale || 'es'}>
      <body suppressHydrationWarning>
        <Providers locale={params.locale || 'es'} session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
