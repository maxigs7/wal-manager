import { ComponentProps } from 'react';

import { classnames } from '@/lib/classnames';

type Props = ComponentProps<'div'> & {
  isInvalid?: boolean;
};

export const FormControl: React.FC<Props> = ({ children, className, isInvalid, ...props }) => (
  <div
    className={classnames(
      'relative h-10 w-full min-w-[200px]',
      isInvalid && 'is-invalid group mb-4',

      className,
    )}
    {...props}
  >
    {children}
  </div>
);
