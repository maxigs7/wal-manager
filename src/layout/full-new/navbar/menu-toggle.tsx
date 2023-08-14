'use client';

import React from 'react';

import { NavbarMenuToggle } from '@nextui-org/navbar';

import { useSidebar } from '../sidebar/provider';

type Props = {
  closeLabel: string;
  openLabel: string;
};

const MyNavbarMenuToggle: React.FC<Props> = ({ closeLabel, openLabel }) => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <NavbarMenuToggle
      aria-label={collapsed ? closeLabel : openLabel}
      className="lg:hidden"
      onClick={setCollapsed}
    />
  );
};

export { MyNavbarMenuToggle as NavbarMenuToggle };
