import { PropsWithChildren } from 'react';

export const AuthPageTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <h1 className="mb-6 text-xl font-bold md:text-3xl">{children}</h1>
);
