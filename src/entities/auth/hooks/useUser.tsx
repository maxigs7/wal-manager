import { useContext } from 'react';

import { IState } from '../model/state';
import { AuthContext } from '../provider';

export const useUser = (): IState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a AuthProvider.`);
  }
  return context;
};
