import 'server-only';
import '@/styles/globals.css';

import { Open_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { classnames } from '@/lib/classnames';
import { createServerClient } from '@/lib/supabase/create-server-client';
import { PageBase } from '@/m/shared/models';

import { Providers } from './providers';

const openSans = Open_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400'],
});

const RootLayout = async ({ children, params }: PropsWithChildren & PageBase) => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html className={classnames(openSans.variable, 'green-dark')} lang={params.locale}>
      <body>
        <Providers locale={params.locale} session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
