'use client';

import { PropsWithChildren, useEffect, useReducer } from 'react';

import { createContext } from '@/lib/react/context';
import { useSupabase } from '@/lib/supabase/provider';

import { authEnd, authStart } from '../store/actions';
import { reducer } from '../store/reducer';
import { initialState, IState } from '../store/state';

const [AuthContextProvider, useUser] = createContext<IState>({ name: 'FullLayoutContext' });

export { useUser };
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    supabase: { auth },
  } = useSupabase();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          const user = session.user;
          dispatch(authStart(user));
        }

        dispatch(authEnd());
      }
    }

    getInitialSession();

    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      if (session) {
        const user = session.user;
        dispatch(authStart(user));
      }
    });

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, [auth]);

  return <AuthContextProvider value={state}>{children}</AuthContextProvider>;
};
