'use client';

import React, { PropsWithChildren } from 'react';

import { tv } from '@nextui-org/react';

import { useSidebar } from './provider';

const container = tv({
  base: [
    'bg-background py-6 px-3 border-r-1 border-r-background-400/10',
    'flex-shrink-0 overflow-y-auto',
    'fixed z-40 w-64 h-full',
    'transition-transform duration-200 ease-in-out',
    'lg:ml-0 lg:flex lg:flex-col lg:static lg:h-screen lg:translate-x-0',
  ],
  variants: {
    collapsed: {
      true: 'block ml-0 translate-x-0',
      false: '-translate-x-full ',
    },
  },
});

const SidebarContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { collapsed } = useSidebar();

  return <div className={container({ collapsed })}>{children}</div>;
};

export { SidebarContainer };
