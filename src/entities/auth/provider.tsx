import { createContext, useContext, useEffect, useReducer } from 'react';

import { useSupabase } from '@shared';

import { authStart } from './model/actions';
import { reducer } from './model/reducer';
import { initialState, IState } from './model/state';

export const AuthContext = createContext<IState>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const { auth } = useSupabase();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = auth.user();
    dispatch(authStart(user));

    const { data: listener } = auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user || null;
      dispatch(authStart(user));
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useUser = (): IState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthProvider.`);
  }
  return context;
};
