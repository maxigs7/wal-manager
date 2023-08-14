import 'server-only';

import React, { PropsWithChildren } from 'react';

const SidebarWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <aside className="h-screen sticky top-0 z-50">{children}</aside>;
};

export { SidebarWrapper };
