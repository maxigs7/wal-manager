import { createContext, useContext, useEffect, useReducer } from 'react';

import { useSupabase } from '@lib';

import { authStart } from '../store/actions';
import { reducer } from '../store/reducer';
import { initialState, IState } from '../store/state';

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
