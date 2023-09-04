'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import Tabs from '@mui/material/Tabs';

import { MenuItem } from '@/models';

type Props = {
  menu: MenuItem[];
} & PropsWithChildren;

const SettingsTabs: React.FC<Props> = ({ children, menu }) => {
  const pathname = usePathname();
  const activeIndex = menu.findIndex((m) => m.href && pathname?.startsWith(m.href));

  return <Tabs value={activeIndex > -1 ? activeIndex : 0}>{children}</Tabs>;
};

export default SettingsTabs;
