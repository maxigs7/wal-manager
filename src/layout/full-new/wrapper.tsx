import React, { PropsWithChildren } from 'react';

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex">{children}</div>;
};

export { Wrapper };
