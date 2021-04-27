import { createContext, useContext } from 'react';

const apiContext = createContext<any>(null);

export const ApiProvider = apiContext.Provider;

export const useApi = () => useContext(apiContext);
