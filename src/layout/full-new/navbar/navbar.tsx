'use client';

import React from 'react';

import { Navbar, NavbarProps } from '@nextui-org/navbar';

import { useSidebar } from '../sidebar/provider';

const MyNavbar: React.FC<NavbarProps> = ({ children }) => {
  const { setCollapsed } = useSidebar();
  return (
    <Navbar maxWidth="full" onMenuOpenChange={setCollapsed} isBordered>
      {children}
    </Navbar>
  );
};

export { MyNavbar as Navbar };
