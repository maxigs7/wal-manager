import React from 'react';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames';

import { IMenuItem } from './menu-data';

export type SidebarMenuItemProps = IMenuItem & {
  isActive: boolean;
};

export type SidebarMenuItemLinkProps = Omit<SidebarMenuItemProps, 'title' | 'Icon'>;

const SidebarMenuItemLink: React.FC<SidebarMenuItemLinkProps> = ({ path, children }) => (
  <NavLink
    activeClassName="bg-gray-900 hover:text-gray-200"
    className={classnames(
      `group flex flex-grow items-center`,
      'text-gray-200 hover:text-white hover:bg-gray-900',
      'transition duration-150 p-3',
    )}
    to={path}
    exact
  >
    {children}
  </NavLink>
);

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = React.memo(
  ({ Icon, isActive, title, path }) => (
    <li>
      {path && (
        <SidebarMenuItemLink isActive={isActive} path={path}>
          {Icon && (
            <Icon
              className={classnames(
                'h-6 w-6 mr-3',
                'group-hover:text-indigo-600',
                isActive && 'text-indigo-600',
                !isActive && 'text-gray-600',
              )}
            />
          )}
          <span className="text-sm font-medium">{title}</span>
        </SidebarMenuItemLink>
      )}
    </li>
  ),
);
