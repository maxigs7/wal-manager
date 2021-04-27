import React, { createContext, useEffect, useState, useContext } from 'react';
import {} from 'react';
import { useFirebase } from './firebase.provider';

export interface IUserContextProps {
  user?: any;
}

export const UserContext: React.Context<IUserContextProps> = createContext<IUserContextProps>(
  { user: null },
);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  const firebase = useFirebase();

  useEffect(() => {
    firebase?.auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });
  }, [firebase]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  useContext(UserContext);
};
