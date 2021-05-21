import React from 'react';

import { useSidebar } from '../context';

export const SidebarBackdrop: React.FC = React.memo(() => {
  const { close, isOpen } = useSidebar();

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={close}
    ></div>
  );
});
