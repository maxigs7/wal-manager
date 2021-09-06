import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface ISidebarContextProps {
  close(): void;
  isOpen: boolean;
  open(): void;
  toggle(): void;
}

export const SidebarContext: React.Context<ISidebarContextProps> =
  createContext<ISidebarContextProps>({} as ISidebarContextProps);

export const useSidebar: () => ISidebarContextProps = () => useContext(SidebarContext);

export const SidebarProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((val) => !val), []);

  const sidebar: ISidebarContextProps = useMemo(
    () => ({
      close,
      isOpen,
      open,
      toggle,
    }),
    [isOpen],
  );

  return <SidebarContext.Provider value={sidebar}>{children}</SidebarContext.Provider>;
};
