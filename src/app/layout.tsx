import 'server-only';

import { PropsWithChildren } from 'react';

import { Roboto, Roboto_Slab } from '@next/font/google';

import { WithClientProviders } from '@/bootstrap';
import { createServerClient } from '@/lib/supabase/server';

// If loading a variable font, you don't need to specify the font weight

import '@/styles/globals.css';

const roboto = Roboto({
  display: 'optional',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '400'],
});

const robotoSlab = Roboto_Slab({
  display: 'optional',
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['100', '400'],
});

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <head />
      <body className={`${roboto.variable} ${robotoSlab.variable} font-sans`}>
        <WithClientProviders session={session}>{children}</WithClientProviders>
      </body>
    </html>
  );
}
