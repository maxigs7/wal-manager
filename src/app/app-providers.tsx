import { PropsWithChildren } from 'react';

import { Session } from '@supabase/auth-helpers-nextjs';

import { ChakraUiProvider } from '@/lib/chakra-ui';
import { ReactQueryProvider } from '@/lib/react-query';
import { SupabaseListener, SupabaseProvider } from '@/lib/supabase';
import { AuthProvider } from '@/m/auth/providers';
import theme from '@/theme';

type Props = PropsWithChildren & { session: Session | null };

export const AppProviders: React.FC<Props> = ({ children, session }) => {
  return (
    <ChakraUiProvider theme={theme}>
      <ReactQueryProvider>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <AuthProvider>{children}</AuthProvider>
        </SupabaseProvider>
      </ReactQueryProvider>
    </ChakraUiProvider>
  );
};
