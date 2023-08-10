import { PropsWithChildren } from 'react';

export const PageTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-center text-xl mb-5">{children}</h2>
);
