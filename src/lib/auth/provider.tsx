import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';

import { AuthContext, IAuthContextProps, IUser } from './context';

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useProvideAuth = (): IAuthContextProps => {
  const [user, setUser] = useState<IUser | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    const user = response.user?.toJSON();
    setUser(user as IUser);
    return user;
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user?.toJSON() as IUser);
      setInitializing(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user: user || undefined, signOut, signInWithGoogle, initializing };
};
