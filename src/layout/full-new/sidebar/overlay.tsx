'use client';

import React, { PropsWithChildren } from 'react';

import { classnames } from '@/lib/classnames';

import { useSidebar } from './provider';

const SidebarOverlay: React.FC<PropsWithChildren> = ({ children }) => {
  const { collapsed, setCollapsed } = useSidebar();

  if (!collapsed) {
    return null;
  }

  return (
    <div
      onClick={setCollapsed}
      className={classnames(
        'bg-background/30 fixed inset-0 z-30 opacity-80',
        'transition-opacity duration-300 ease-linear',
        'lg:hidden lg:z-auto lg:opacity-1',
      )}
    >
      {children}
    </div>
  );
};

export { SidebarOverlay };
