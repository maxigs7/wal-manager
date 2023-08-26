'use client';

import { PropsWithChildren, useCallback, useState } from 'react';

import { SidebarMenuKeys } from '@/i18n';
import { createContext } from '@/lib/react/context';

type AdminLayoutContext = {
  closeSidebar: () => void;
  isSidebarOpen: boolean;
  menuItemSelected: SidebarMenuKeys | undefined;
  toggleSidebar: () => void;
  toggleMenuItem: (key: SidebarMenuKeys) => void;
};

const [AdminLayoutContextProvider, useAdminLayout] = createContext<AdminLayoutContext>({
  name: 'AdminLayoutContext',
});

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuItemSelected, setMenuItemSelected] = useState<SidebarMenuKeys>();

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((val) => !val);
  }, []);

  const toggleMenuItem = useCallback((key: SidebarMenuKeys) => {
    setMenuItemSelected((prevKey) => (prevKey === key ? undefined : key));
  }, []);

  return (
    <AdminLayoutContextProvider
      value={{
        closeSidebar,
        isSidebarOpen,
        menuItemSelected,
        toggleSidebar,
        toggleMenuItem,
      }}
    >
      {children}
    </AdminLayoutContextProvider>
  );
};

export { Provider as AdminLayoutProvider, useAdminLayout };
