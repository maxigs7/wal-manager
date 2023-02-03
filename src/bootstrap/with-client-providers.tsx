import { PropsWithChildren } from 'react';

import { Session } from '@supabase/auth-helpers-nextjs';

import { NextFontsProvider } from '@/lib/@next/font';
import { CharkraUiProvider } from '@/lib/chakra-ui';
import { ReactQueryProvider } from '@/lib/react-query';
import { SupabaseListener, SupabaseProvider } from '@/lib/supabase';
import { AuthProvider } from '@/m/auth';
import theme from '@/theme';

type Props = PropsWithChildren & { session: Session | null };

export const WithClientProviders: React.FC<Props> = ({ children, session }) => {
  return (
    <ReactQueryProvider>
      <NextFontsProvider>
        <CharkraUiProvider theme={theme}>
          <SupabaseProvider session={session}>
            <SupabaseListener serverAccessToken={session?.access_token} />
            <AuthProvider>{children}</AuthProvider>
          </SupabaseProvider>
        </CharkraUiProvider>
      </NextFontsProvider>
    </ReactQueryProvider>
  );
};
