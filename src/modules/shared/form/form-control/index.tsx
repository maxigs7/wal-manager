import { tv } from 'tailwind-variants';

import { PropsWithChildrenAndClass } from '@/lib/react';

const formControl = tv({
  base: 'flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4',
});

const FormControl: React.FC<PropsWithChildrenAndClass> = ({ children, className }) => {
  return <div className={formControl({ class: className })}>{children}</div>;
};

export { FormControl };
