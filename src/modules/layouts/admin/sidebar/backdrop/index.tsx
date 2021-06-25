import React from 'react';

import classnames from '@lib/classnames';

import { useSidebar } from '../context';

const styles = {
  backdrop: (isOpen: boolean) =>
    classnames(
      'fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200',
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
    ),
};

export const SidebarBackdrop: React.FC = () => {
  const { close, isOpen } = useSidebar();

  return <div aria-hidden="true" className={styles.backdrop(isOpen)} onClick={close}></div>;
};
