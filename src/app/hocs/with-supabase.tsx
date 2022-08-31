import { createClient } from '@supabase/supabase-js';

import { SupabaseProvider } from '@lib';
import { SUPABASE_ANON_KEY, SUPABASE_API_URL } from '@shared';

const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);

export const withSupabase = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithSupabase = (props: T) => (
    <SupabaseProvider supabase={supabase}>
      <WrappedComponent {...(props as T)} />
    </SupabaseProvider>
  );

  ComponentWithSupabase.displayName = `withSupabase(${displayName})`;

  return ComponentWithSupabase;
};
