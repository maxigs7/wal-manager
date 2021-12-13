import { createSupabaseClient, SupabaseProvider } from '@shared';

const supabase = createSupabaseClient();

export const withSupabase = <T,>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  // Try to create a nice displayName for React Dev Tools.
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
