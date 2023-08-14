'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Link } from '@nextui-org/link';
import { tv } from '@nextui-org/react';

import { MenuItem } from '@/models';

import { useSidebar } from '../provider';
import { MenuItemIcon } from './icon';

const link = tv({
  slots: {
    base: [
      'flex flex-row gap-3 items-center px-3 rounded-lg ',
      'text-foreground cursor-pointer hover:bg-accent-200',
      'w-full h-11',
      'transition-all duration-150 ease-in-out active:scale-95',
    ],
    icon: 'w-6 h-6',
  },
  variants: {
    isActive: {
      true: {
        base: 'bg-accent-200',
        icon: 'fill-accent-200',
      },
    },
  },
});

const SidebarMenuItem: React.FC<MenuItem> = ({ icon, title, href = '' }) => {
  const { setCollapsed } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href) || false;
  const { base, icon: iconCss } = link({ isActive });

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };

  return (
    <Link as={NextLink} className={base()} href={href} onClick={handleClick}>
      <MenuItemIcon className={iconCss()} icon={icon} />
      <span className="font-normal text-base">{title}</span>
    </Link>
  );
};

export { SidebarMenuItem };
