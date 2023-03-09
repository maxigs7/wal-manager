import { PropsWithChildren } from 'react';

const ErrorBox: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-full rounded-md bg-red-200 px-4 py-2 text-red-700">{children}</div>;
};

export { ErrorBox };
