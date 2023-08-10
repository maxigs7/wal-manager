'use client';

import { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { Session } from '@supabase/auth-helpers-nextjs';

import { I18nProviderClient } from '@/i18n/client';
import { ChakraUiProvider } from '@/lib/chakra-ui';
import { ReactQueryProvider } from '@/lib/react-query';
import { SupabaseListener } from '@/lib/supabase/listener';
import { SupabaseProvider } from '@/lib/supabase/provider';
import { AuthProvider } from '@/m/auth/providers';
import theme from '@/theme';

type Props = PropsWithChildren & { locale: string; session: Session | null };

export const Providers: React.FC<Props> = ({ children, locale, session }) => {
  return (
    <I18nProviderClient locale={locale}>
      <NextUIProvider>
        {/* <ChakraUiProvider theme={theme}> */}
        <ReactQueryProvider>
          <SupabaseProvider session={session}>
            <SupabaseListener serverAccessToken={session?.access_token} />
            <AuthProvider>{children}</AuthProvider>
          </SupabaseProvider>
        </ReactQueryProvider>
        {/* </ChakraUiProvider> */}
      </NextUIProvider>
    </I18nProviderClient>
  );
};
