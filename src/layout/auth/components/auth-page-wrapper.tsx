import { classnames } from '@/lib/classnames';
import { PropsWithChildrenAndClass } from '@/lib/react';

export const AuthPageWrapper: React.FC<PropsWithChildrenAndClass> = ({ children, className }) => (
  <div className={classnames('p-4 text-center sm:p-5 md:p-10 xl:py-12 xl:px-16', className)}>
    {children}
  </div>
);
