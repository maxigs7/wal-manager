import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { AuthContext, IAuthContextProps, IUser } from './context';

interface IState {
  user: IUser | null;
  initializing: boolean;
}

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useProvideAuth = (): IAuthContextProps => {
  const [state, setState] = useState<IState>({ initializing: true } as IState);
  const auth = useMemo(() => getAuth(), []);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    const user = response.user?.toJSON();

    setState((state) => ({ ...state, user: user as IUser }));
    return user;
  }, []);

  const signOut = useCallback(async () => {
    await auth.signOut();
    setState((state) => ({ ...state, user: null }));
  }, []);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ initializing: false, user: user?.toJSON() as IUser });
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return useMemo(
    () => ({
      user: state.user,
      signOut,
      signInWithGoogle,
      initializing: state.initializing,
    }),
    [state],
  );
};
