'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/models';

import { createBrowserClient } from './create-browser-client';

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: MaybeSession;
};

const Context: React.Context<SupabaseContext> = createContext<SupabaseContext>(
  {} as SupabaseContext,
);

export const SupabaseProvider: React.FC<PropsWithChildren & { session: MaybeSession }> = ({
  children,
  session,
}) => {
  const [supabase] = useState(() => createBrowserClient());
  return <Context.Provider value={{ supabase, session }}>{children}</Context.Provider>;
};

export const useSupabase = (): SupabaseContext => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(`useSupabase must be used within a SupabaseProvider.`);
  }
  return context;
};
