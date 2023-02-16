'use client';

import { createContext, PropsWithChildren, useContext, useRef, useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { IBreadcrumbItem } from '../breadcrumb';

interface IProps {
  breadcrumb: IBreadcrumbItem[];
  breadcrumbRef: any;
  closeSidebar(): void;
  isSidebarOpen: boolean;
  openSidebar(): void;
  setBreadcrumb(items: IBreadcrumbItem[]): void;
  toggleSidebar(): void;
}

export const LayoutContext: React.Context<IProps> = createContext<IProps>({} as IProps);

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const breadcrumbRef = useRef();
  const [breadcrumb, setBreadcrumb] = useState<IBreadcrumbItem[]>([]);

  return (
    <LayoutContext.Provider
      value={{
        breadcrumb,
        breadcrumbRef: breadcrumbRef,
        closeSidebar: onClose,
        isSidebarOpen: isOpen,
        openSidebar: onOpen,
        setBreadcrumb,
        toggleSidebar: onToggle,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
