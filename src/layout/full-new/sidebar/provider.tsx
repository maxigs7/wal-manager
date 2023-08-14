'use client';

import { PropsWithChildren, useState } from 'react';

import { createContext } from '@/lib/react/context';

type SidebarContext = {
  collapsed: boolean;
  setCollapsed: () => void;
};

const [SidebarContextProvider, useSidebar] = createContext<SidebarContext>({
  name: 'FullLayoutContext',
});

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [_, setLocked] = useLockedBody(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // setLocked(!sidebarOpen);
  };

  return (
    <SidebarContextProvider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      {children}
    </SidebarContextProvider>
  );
};

export { Provider as SidebarProvider, useSidebar };
