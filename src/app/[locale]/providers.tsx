'use client';

import { PropsWithChildren } from 'react';

import { Session } from '@supabase/auth-helpers-nextjs';

import { I18nProviderClient } from '@/i18n/client';
import { ReactQueryProvider } from '@/lib/react-query';
import { SupabaseListener } from '@/lib/supabase/listener';
import { SupabaseProvider } from '@/lib/supabase/provider';
import { AuthProvider } from '@/m/auth/providers';
import ThemeRegistry from '@/m/shared/theme-registry';

type Props = PropsWithChildren & { locale: string; session: Session | null };

export const Providers: React.FC<Props> = ({ children, locale, session }) => {
  return (
    <I18nProviderClient locale={locale}>
      <ThemeRegistry>
        <ReactQueryProvider>
          <SupabaseProvider session={session}>
            <SupabaseListener serverAccessToken={session?.access_token} />
            <AuthProvider>{children}</AuthProvider>
          </SupabaseProvider>
        </ReactQueryProvider>
      </ThemeRegistry>
    </I18nProviderClient>
  );
};
