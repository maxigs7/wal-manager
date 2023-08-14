import 'server-only';

import React, { PropsWithChildren } from 'react';

const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col flex-auto overflow-x-hidden overflow-y-auto">
      {children}
    </div>
  );
};

export { ContentWrapper };
