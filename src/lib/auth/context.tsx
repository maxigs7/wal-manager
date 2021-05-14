import React, { createContext, useContext } from 'react';

export interface IUser {
  createdAt: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  photoURL: string;
  uid: string;
}

export interface IAuthContextProps {
  initializing: boolean;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  user?: IUser;
}

export const AuthContext: React.Context<IAuthContextProps> = createContext<IAuthContextProps>(
  {} as IAuthContextProps,
);

export const useAuth: () => IAuthContextProps = () => useContext(AuthContext);
