import React from 'react';
import { NavLink } from 'react-router-dom';

import { IMenuItem } from './menu-data';

export type SidebarMenuItemProps = IMenuItem & {
  isActive: boolean;
};

export type SidebarMenuItemLinkProps = Omit<SidebarMenuItemProps, 'title' | 'Icon'>;

const SidebarMenuItemLink: React.FC<SidebarMenuItemLinkProps> = ({ isActive, path, children }) => (
  <NavLink
    className={`block text-gray-200 hover:text-white transition duration-150 ${
      isActive && 'hover:text-gray-200'
    }`}
    to={path}
    exact
  >
    {children}
  </NavLink>
);

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = React.memo(
  ({ Icon, isActive, title, path }) => (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${isActive && 'bg-gray-900'}`}>
      {path && (
        <SidebarMenuItemLink isActive={isActive} path={path}>
          <div className="flex flex-grow">
            {Icon && (
              <Icon
                className={`flex-shrink-0 h-6 w-6 mr-3 text-gray-600 ${
                  isActive && 'text-indigo-600'
                }`}
              />
            )}
            <span className="text-sm font-medium">{title}</span>
          </div>
        </SidebarMenuItemLink>
      )}
    </li>
  ),
);
