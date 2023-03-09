import { ComponentProps } from 'react';

import { classnames } from '@/lib/classnames';

type Props = ComponentProps<'div'>;

export const FormErrorMessage: React.FC<Props> = ({ children, className, ...props }) => (
  <div
    className={classnames('mt-2 flex items-center text-sm leading-normal text-red-500', className)}
    {...props}
  >
    {children}
  </div>
);
