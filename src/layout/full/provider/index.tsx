'use client';

import { PropsWithChildren } from 'react';

import { createContext } from '@/lib/react/context';

import { UseSidebarManagerReturn, useSidebarManager } from './useSidebarManager';

interface IProps {
  sidebar: UseSidebarManagerReturn;
}

const [LayoutContextProvider, useLayout] = createContext<IProps>({ name: 'FullLayoutContext' });

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const sidebar = useSidebarManager();

  return (
    <LayoutContextProvider
      value={{
        sidebar,
      }}
    >
      {children}
    </LayoutContextProvider>
  );
};

export { Provider as LayoutProvider, useLayout };
