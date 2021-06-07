import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRouter } from '@app/hooks/useRouter';
import classnames from '@lib/classnames';

import { SidebarBackdrop } from './backdrop';
import { useSidebar } from './context';
import { SidebarMenu } from './menu';

const styles = {
  button: 'lg:hidden text-gray-500 hover:text-gray-400',
  buttonIcon: 'h-6 w-6',
  header: 'flex justify-between mb-5 p-4',
  homeLink: 'text-gray-200 hover:text-white transition duration-150 lg:flex-1',
  sidebar: (isOpen: boolean) =>
    classnames(
      'absolute z-40 left-0 top-0',
      'lg:static lg:left-auto lg:top-auto lg:translate-x-0',
      'transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 transition-transform duration-200 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-64',
    ),
  wrapper: 'lg:w-64',
};

export const Sidebar: React.FC = React.memo(() => {
  const { pathname } = useRouter();
  const { close, isOpen } = useSidebar();

  return (
    <div className={styles.wrapper}>
      {/* Sidebar backdrop (mobile only) */}
      <SidebarBackdrop />

      {/* Sidebar */}
      <div className={styles.sidebar(isOpen)} id="sidebar">
        {/* Sidebar header */}
        <div className={styles.header}>
          {/* Close button */}
          <button
            aria-controls="sidebar"
            aria-expanded={isOpen}
            className={styles.button}
            onClick={close}
          >
            <span className="sr-only">Close sidebar</span>
            <FontAwesomeIcon className={styles.buttonIcon} icon="arrow-left" />
          </button>
          {/* Logo */}
          <NavLink className={styles.homeLink} to="/" exact>
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
