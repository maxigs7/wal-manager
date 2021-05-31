import React, { createContext, useContext } from 'react';
import { TableInstance } from 'react-table';

export interface IReactTableContextProps {
  table: any;
}

export const ReactTableContext: React.Context<IReactTableContextProps> =
  createContext<IReactTableContextProps>({} as IReactTableContextProps);

export function useReactTable<T extends Record<string, unknown>>(): TableInstance<T> {
  return useContext(ReactTableContext).table;
}
