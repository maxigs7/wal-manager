import React from 'react';
import { NavLink } from 'react-router-dom';

import classnames from '@lib/classnames';

import { IMenuItem } from './menu-data';

const styles = {
  icon: (isActive: boolean) =>
    classnames(
      'h-6 w-6 mr-3',
      'group-hover:text-primary-600',
      isActive && 'text-primary-600',
      !isActive && 'text-gray-600',
    ),
  link: classnames(
    `group flex flex-grow items-center`,
    'text-gray-200 hover:text-white hover:bg-gray-900',
    'transition duration-150 p-3',
  ),
  linkActive: 'bg-gray-900 hover:text-gray-200',
  title: 'text-sm font-medium',
};

export type SidebarMenuItemProps = IMenuItem & {
  isActive: boolean;
};

export type SidebarMenuItemLinkProps = Omit<SidebarMenuItemProps, 'title' | 'Icon'>;

const SidebarMenuItemLink: React.FC<SidebarMenuItemLinkProps> = ({ path, children }) => (
  <NavLink activeClassName={styles.linkActive} className={styles.link} to={path} exact>
    {children}
  </NavLink>
);

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = React.memo(
  ({ Icon, isActive, title, path }) => (
    <li>
      {path && (
        <SidebarMenuItemLink isActive={isActive} path={path}>
          {Icon && <Icon className={styles.icon(isActive)} />}
          <span className={styles.title}>{title}</span>
        </SidebarMenuItemLink>
      )}
    </li>
  ),
);
