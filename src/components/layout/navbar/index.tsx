import React from 'react';

import { MenuIcon } from '@heroicons/react/solid';

import { useSidebar } from '../sidebar';
import { UserMenu } from './user-menu';

export const Navbar: React.FC = React.memo(() => {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
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
          <div className="flex items-center">
            {/* <SearchModal />
            <Notifications />
            <Help /> */}
            {/*  Divider */}
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
});
