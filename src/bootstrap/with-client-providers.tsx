import { PropsWithChildren } from 'react';

import { Session } from '@supabase/auth-helpers-nextjs';

import { ReactQueryProvider } from '@/lib/react-query';
import { SupabaseListener, SupabaseProvider } from '@/lib/supabase';
import { AuthProvider } from '@/m/auth/providers';

type Props = PropsWithChildren & { session: Session | null };

export const WithClientProviders: React.FC<Props> = ({ children, session }) => {
  return (
    <ReactQueryProvider>
      <SupabaseProvider session={session}>
        <SupabaseListener serverAccessToken={session?.access_token} />
        <AuthProvider>{children}</AuthProvider>
      </SupabaseProvider>
    </ReactQueryProvider>
  );
};
