import { createContext, PropsWithChildren, useContext, useEffect, useReducer } from 'react';

import { useSupabase } from '@lib';

import { authEnd, authStart } from '../store/actions';
import { reducer } from '../store/reducer';
import { initialState, IState } from '../store/state';

export const AuthContext = createContext<IState>(initialState);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { auth } = useSupabase();
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

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useUser = (): IState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthProvider.`);
  }
  return context;
};
