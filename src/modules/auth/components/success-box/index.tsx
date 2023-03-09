import { PropsWithChildren } from 'react';

const SuccessBox: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-full rounded-md bg-green-200 px-4 py-2 text-green-700">{children}</div>;
};

export { SuccessBox };
