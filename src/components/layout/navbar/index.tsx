import React from 'react';

import { MenuIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

import { useSidebar } from '../sidebar';
import { UserMenu } from './user-menu';

export const Navbar: React.FC = React.memo(() => {
  const { toggle } = useSidebar();

  return (
    <header
      className={classNames(
        'sticky top-0 z-10 h-16 bg-white',
        'shadow-md px-4 sm:px-6 lg:px-8',
        'border-b border-gray-200',
        'flex items-center justify-between',
      )}
    >
      {/* Header: Left side */}
      <div className="flex">
        {/* Hamburger button */}
        <button
          aria-controls="sidebar"
          className="text-gray-500 hover:text-gray-600 lg:hidden"
          onClick={toggle}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="w-6 h-6 fill-current" />
        </button>
      </div>
      {/* Header: Right side */}
      <div className="flex items-center h-full">
        {/* <SearchModal />
            <Notifications />
            <Help /> */}
        {/*  Divider */}
        <UserMenu />
      </div>
    </header>
  );
});
