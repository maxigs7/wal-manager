import { createContext, useContext, useEffect, useReducer } from 'react';

import { useSupabase } from '../context';
import { authInit } from './actions';
import { reducer } from './reducer';
import { initialState, IState } from './state';

export const AuthContext = createContext<IState>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const { auth } = useSupabase();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const session = auth.session();
    dispatch(authInit({ session, user: session?.user ?? null }));
    const { data: authListener } = auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`);
      dispatch(authInit({ session, user: session?.user ?? null }));
    });

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
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
