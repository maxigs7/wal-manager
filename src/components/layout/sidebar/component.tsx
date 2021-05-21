import React from 'react';
import { NavLink } from 'react-router-dom';

import { ArrowLeftIcon } from '@heroicons/react/solid';

import { useRouter } from '@app/hooks/useRouter';

import { SidebarBackdrop } from './backdrop';
import { useSidebar } from './context';
import { SidebarMenu } from './menu';

export const Sidebar: React.FC = React.memo(() => {
  const { pathname } = useRouter();
  const { close, isOpen } = useSidebar();

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <SidebarBackdrop />

      {/* Sidebar */}
      <div
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
        id="sidebar"
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            aria-controls="sidebar"
            aria-expanded={isOpen}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={close}
          >
            <span className="sr-only">Close sidebar</span>
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          {/* Logo */}
          <NavLink
            className="block text-gray-200 hover:text-white transition duration-150"
            to="/"
            exact
          >
            Wal Manager
          </NavLink>
        </div>

        <div>
          <SidebarMenu pathname={pathname} />
        </div>
      </div>
    </div>
  );
});
