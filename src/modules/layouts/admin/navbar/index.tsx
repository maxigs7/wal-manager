import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classnames from '@lib/classnames';

import { useSidebar } from '../sidebar';
import { UserMenu } from './user-menu';

const styles = {
  header: classnames(
    'sticky top-0 z-10 h-16 bg-white',
    'shadow-md px-4 sm:px-6 lg:px-8',
    'border-b border-gray-200',
    'flex items-center justify-between',
  ),
  rightSide: 'flex items-center h-full',
  toggleButton: 'text-gray-500 hover:text-gray-600 lg:hidden',
  toggleButtonIcon: 'w-6 h-6 fill-current',
};

export const Navbar: React.FC = () => {
  const { toggle } = useSidebar();

  return (
    <header className={styles.header}>
      {/* Header: Left side */}
      <div className="flex">
        {/* Hamburger button */}
        <button aria-controls="sidebar" className={styles.toggleButton} onClick={toggle}>
          <span className="sr-only">Open sidebar</span>
          <FontAwesomeIcon className={styles.toggleButtonIcon} icon="bars" />
        </button>
      </div>
      {/* Header: Right side */}
      <div className={styles.rightSide}>
        {/* <SearchModal />
            <Notifications />
            <Help /> */}
        {/*  Divider */}
        <UserMenu />
      </div>
    </header>
  );
};
